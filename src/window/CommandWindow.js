class CommandWindow extends Window_Command {
  static create(x, y, text = [], commands = [], handlers = []) {
    if (!Array.isArray(text)) {
      throw new Error('text must be an array!');
    }
    if (commands.length !== handlers.length) {
      throw new Error('Commands and handlers must have the same length!');
    }
    const width = Graphics.boxWidth;
    const windowPadding = CommandWindow.windowPadding() * 2;
    const textHeight = CommandWindow.textHeight() * Math.max(text.length, 0);
    const itemsPadding = CommandWindow.itemPadding() * Math.max(commands.length - 1, 0);
    const itemsHeight = CommandWindow.itemHeight() * Math.max(commands.length, 0);
    const height = windowPadding + textHeight + itemsPadding + itemsHeight;
    const rect = new Rectangle(x, y, width, height);
    return new CommandWindow(rect, text, commands, handlers);
  }
  
  static windowPadding() {
    return 12;
  }

  static itemPadding() {
    return 8;
  }

  static textHeight() {
    return 36;
  }

  static itemHeight() {
    return 40;
  }

  static createCommand(name, symbol, enabled = true, ext = null) {
    return { name, symbol, enabled, ext };
  }

  static setTextColor(text, colorIndex) {
    return `\\c[${colorIndex}]${text}`;
  }

  static getVerticalAlign(position, window) {
    switch (position) {
      case GameConst.MIDDLE:
        return (Graphics.boxHeight / 2) - ((window.height || 0) / 2);
        break;
      case GameConst.BOTTOM:
        return Graphics.boxHeight - ((window.height || 0) + (Graphics.boxHeight / 6));
        break;
      default: //TOP
        return Graphics.boxHeight / 6;
    }
  }

  initialize(rect, text, commands, handlers) {
    super.initialize(rect);
    this._actions = [];
    this._history = [];
    this._commands = commands;
    this._commandHandlers = handlers;
    this._commandTextAlignment = GameConst.LEFT;
    this._text = text;
    this._textAlignment = GameConst.LEFT;
    this._windowColor = GameConst.DEFAULT_COLOR;
    this.closed();
    this.refresh();
  }

  closed() {
    this._openness = 0;
    this.visible = false;
    this.deactivate();
  }

  refresh() {
    this.clearCommandList();
    this.makeCommandList();
    this.setHandlers();
    this.clearContents();
    this.drawAllItems();
  }

  makeCommandList() {
    if (!this._commands || (Array.isArray(this._commands) && this._commands.length === 0)) return;
    this._commands.forEach(command => {
      const { name, symbol, enabled, ext } = command;
      this.addCommand(name, symbol, enabled, ext);
    });
  }

  setHandlers() {
    if (!this._commandHandlers || (Array.isArray(this._commandHandlers) && this._commandHandlers.length === 0)) return;
    this._commandHandlers.forEach((handler, index) => {
      this.setHandler(this._commands[index].symbol, handler);
    });
  }

  clearContents() {
    this.contents.clear();
    this.contentsBack.clear();
  }
  
  drawAllItems() {
    if (this.hasText()) this.drawTexts();
    if (this.hasCommands()) super.drawAllItems();
  }

  hasText() {
    return this._text && this._text.length > 0;
  }

  hasCommands() {
    return this.maxItems() > 0;
  }

  drawTexts() {
    const maxWidth = this.getTextMaxWidth(this._text);
    this._text.forEach((text, index) => {
      const state = this.getTextState(text);
      const textWidth = state.outputWidth;
      const textProcessed = state.raw;
      const aligment = this.getTextAlignment();
      const x = this.getXAlignment(textWidth, maxWidth, aligment);
      const rect = this.lineRect(index, x);
      this.addHistory('TEXT_' + index, textProcessed);
      this.drawTextEx(text, rect.x, rect.y, rect.width);
    });
  }

  flushTextState(textState) {
    textState.raw = textState.buffer;
    super.flushTextState(textState);
  }

  processColorChange(colorIndex) {
    const length = this._history.filter(h => /COLOR/i.test(h.symbol)).length;
    this.addHistory('COLOR_' + length, colorIndex);
    super.processColorChange(colorIndex);
  }

  getTextMaxWidth(text) {
    return text.reduce((max, txt) => {
      const state = this.getTextState(txt);
      const width = state.outputWidth;
      return Math.max(max, width);
    }, 0);
  }

  getTextState(txt) {
    const textState = this.createTextState(txt, 0, 0, 0);
    textState.drawing = false;
    this.processAllText(textState);
    return textState;
  }

  getXAlignment(textWidth, maxWidth, align) {
    maxWidth = Math.max(maxWidth, this.width - this.padding * 2);
    switch (align) {
      case GameConst.CENTER:
        return (maxWidth / 2) - (textWidth / 2);
      case GameConst.RIGHT:
        return maxWidth - textWidth;
      default: // GameConst.LEFT
        return 0;
    }
  }

  lineRect(index, x = 0) {
    const y = index * this.lineHeight();
    const width = this.contentsWidth();
    const height = this.lineHeight();
    return new Rectangle(x, y, width, height);
  }

  addHistory(symbol, content) {
    const index = this._history.findIndex(h => h.symbol === symbol);
    if (index >= 0) {
      this._history[index].content = content;
      return;
    }
    const history = this.createHistory(symbol, content);
    this._history.push(history);
  }

  createHistory(symbol, content) {
    return { symbol, content };
  }

  getTextAlignment() {
    return this._textAlignment;
  }

  itemRect(index) {
    const maxCols = this.maxCols();
    const itemWidth = this.itemWidth();
    const itemHeight = this.itemHeight();
    const colSpacing = this.colSpacing();
    const rowSpacing = this.rowSpacing();
    const col = index % maxCols;
    const row = Math.floor(index / maxCols);
    const x = col * itemWidth + colSpacing / 2 - this.scrollBaseX();
    const addMargin = (this._text?.length || 0) * this.lineHeight();
    const y = (row * itemHeight + rowSpacing / 2 - this.scrollBaseY()) + addMargin;
    const width = itemWidth - colSpacing;
    const height = itemHeight - rowSpacing;
    return new Rectangle(x, y, width, height);
  }

  open() {
    this.addAction(this.commandOpen);
  }

  addAction(fn, ...params) {
    const action = this.createAction(fn, ...params);
    this._actions.push(action);
  }

  createAction(fn, ...params) {
    const action = { 
      fn: fn.name || 'anonymous',
      execute: () => fn.call(this, ...params)
    };
    return action;
  }

  commandOpen() {
    if (this.isOpened()) return true;
    this.visible = true;
    this.activate();
    super.open();
    return true;
  }

  isOpened() {
    return this._openness === 255;
  }

  close() {
    this.addAction(this.commandClose);
  }

  commandClose() {
    if (this.isClosed()) return true;
    this.visible = false;
    super.close();
    return true;
  }

  alignTop() {
    this.addAction(this.commandAlign, GameConst.TOP);
  }

  commandAlign(verticalAlign) {
    if (this.isBusy()) return;
    this.setVerticalAlign(verticalAlign);
    this.setHorizontalAlign();
    return true;
  }

  setVerticalAlign(position) {
    this.y = CommandWindow.getVerticalAlign(position, this);
  }

  setHorizontalAlign() {
    this.x = 0;
  }

  changeBlueColor() {
    this.addAction(this.commandChangeBlueColor);
  }

  commandChangeBlueColor() {
    this._windowColor = GameConst.BLUE_COLOR;
    return true;
  }

  changeRedColor() {
    this.addAction(this.commandChangeRedColor);
  }

  commandChangeRedColor() {
    this._windowColor = GameConst.RED_COLOR;
    return true;
  }

  changeDefaultColor() {
    this.addAction(this.commandChangeDefaultColor);
  }

  commandChangeDefaultColor() {
    this._windowColor = GameConst.DEFAULT_COLOR;
    return true;
  }

  update() {
    super.update();
    if (this.hasActions() && this.isAvailable()) this.executeAction();
    this.updateTone();
  }

  hasActions() {
    return this._actions.length > 0;
  }

  isAvailable() {
    return !this.isBusy();
  }

  isBusy() {
    return this.isOpening() || this.isClosing();
  }

  executeAction() {
    const action = this._actions[0];
    const executed = action.execute();
    if (executed) {
      this._actions.shift();
    }
  }

  updateTone() {
    switch (this._windowColor) {
      case GameConst.BLUE_COLOR:
        this.setTone(0, 0, 255);
        break;
      case GameConst.RED_COLOR:
        this.setTone(255, 0, 0);
        break;
      default:
        this.setTone(0, 0, 0);
    }
  }

  isBlueColor() {
    return this._windowColor === GameConst.BLUE_COLOR;
  }

  isRedColor() {
    return this._windowColor === GameConst.RED_COLOR;
  }

  isDefaultColor() {
    return this._windowColor === GameConst.DEFAULT;
  }

  isFullsize() {
    return this.width === Graphics.boxWidth;
  }

  alignMiddle() {
    this.addAction(this.commandAlign, GameConst.MIDDLE);
  }

  alignBottom() {
    this.addAction(this.commandAlign, GameConst.BOTTOM);
  }

  itemTextAlign() {
    return this._commandTextAlignment.toLowerCase();
  }

  isTextWasDrawing(symbol, content) {
    const history = this.getHistory(symbol);
    if (!history.length) return false;
    return history.some(h => h.content === content);
  }

  getHistory(symbol) {
    return this._history.filter(history => history.symbol === symbol);
  }

  alignTextLeft() {
    this.addAction(this.commandAlignTextLeft);
  }

  commandAlignTextLeft() {
    this._textAlignment = GameConst.LEFT;
    this.refresh();
    return true;
  }

  alignTextCenter() {
    this.addAction(this.commandAlignTextCenter);
  }

  commandAlignTextCenter() {
    this._textAlignment = GameConst.CENTER;
    this.refresh();
    return true;
  }

  alignTextRight() {
    this.addAction(this.commandAlignTextRight);
  }

  commandAlignTextRight() {
    this._textAlignment = GameConst.RIGHT;
    this.refresh();
    return true;
  }
}