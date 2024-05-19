class CommandWindow extends Window_Command {
  static create(x, y, text = [], commands = []) {
    if (!Array.isArray(text)) {
      throw new Error('text must be an array!');
    }
    const width = Graphics.boxWidth;
    const windowPadding = CommandWindow.windowPadding() * 2;
    const textHeight = CommandWindow.textHeight() * Math.max(text.length, 0);
    const itemsPadding = CommandWindow.itemPadding() * Math.max(commands.length - 1, 0);
    const itemsHeight = CommandWindow.itemHeight() * Math.max(commands.length, 0);
    const height = windowPadding + textHeight + itemsPadding + itemsHeight;
    const rect = new Rectangle(x, y, width, height);
    return new CommandWindow(rect, text, commands);
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

  static createCommand(name, symbol, handler, enabled = true, ext = null) {
    if (!name || !symbol) {
      throw new Error('Command name and symbol are required!');
    }
    if (typeof handler !== 'function') {
      throw new Error('Command handler must be a function!');
    }
    return { name, symbol, handler, enabled, ext };
  }

  static setTextColor(text, color) {
    let colorIndex = ColorHelper.getColorIndex(color);
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

  initialize(rect, text, commands) {
    super.initialize(rect);
    this._actions = [];
    this._history = [];
    this._commands = commands;
    this._commandTextAlignment = GameConst.LEFT;
    this._text = text || [];
    this._textAlignment = GameConst.LEFT;
    this._windowColor = GameConst.DEFAULT_COLOR;
    this._iconset = "IconSet";
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
    if (!this.hasCommandsAndHandlers()) return;
    this._commands.forEach(command => {
      const { name, symbol, enabled, ext } = command;
      this.addCommand(name, symbol, enabled, ext);
    });
  }

  hasCommandsAndHandlers() {
    return this._commands && this._commands?.length > 0;
  }

  setHandlers() {
    if (!this.hasCommandsAndHandlers()) return;
    this._commands.forEach(command => {
      const { symbol, handler } = command;
      this.setHandler(symbol, handler);
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

  drawTexts() {
    const texts = this.processTexts(this._text);
    const maxWidth = this.getTextMaxWidth(texts);
    texts.forEach((text, index) => {
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

  processTexts(text) {
    return text.map(txt => {
      if (Array.isArray(txt)) {
        return txt.reduce((acc, substring, index) => index ? `${acc} ${substring}` : `${acc}${substring}`)
      }
      return txt;
    });
  }

  flushTextState(textState) {
    textState.raw += textState.buffer || '';
    textState.raw = textState.raw.replace(/undefined/g, "");
    super.flushTextState(textState);
  }

  processColorChange(colorIndex) {
    const length = this._history.filter(h => /COLOR/i.test(h.symbol)).length;
    this.addHistory('COLOR_' + length, colorIndex);
    super.processColorChange(colorIndex);
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

  getTextAlignment() {
    this.addHistory('TEXT_ALIGN', this._textAlignment);
    return this._textAlignment;
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

  hasCommands() {
    return this.maxItems() > 0;
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

  alignMiddle() {
    this.addAction(this.commandAlign, GameConst.MIDDLE);
  }

  alignBottom() {
    this.addAction(this.commandAlign, GameConst.BOTTOM);
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

  isFullsize() {
    return this.width === Graphics.boxWidth;
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

  isTextWasDrawing(symbol, content) {
    return this.isHistory(symbol, content);
  }
  
  isHistory(symbol, content) {
    const history = this.getHistory(symbol);
    if (!history.length) return false;
    return history.some(h => h.content === content);
  }

  isItemsAlign(symbol, content) {
    return this.isHistory(symbol, content);
  }
  
  getHistory(symbol) {
    return this._history.filter(history => history.symbol === symbol);
  }

  alignTextLeft() {
    this.addAction(this.commandAlignText, GameConst.LEFT);
  }

  alignTextCenter() {
    this.addAction(this.commandAlignText, GameConst.CENTER);
  }

  alignTextRight() {
    this.addAction(this.commandAlignText, GameConst.RIGHT);
  }

  commandAlignText(align) {
    this._textAlignment = align;
    this.refresh();
    return true;
  }

  alignItemsLeft() {
    this.addAction(this.commandAlignItems, GameConst.LEFT);
  }

  alignItemsCenter() {
    this.addAction(this.commandAlignItems, GameConst.CENTER);
  }

  alignItemsRight() {
    this.addAction(this.commandAlignItems, GameConst.RIGHT);
  }

  commandAlignItems(align) {
    this._commandTextAlignment = align;
    this.refresh();
    return true;
  }

  itemTextAlign() {
    this.addHistory('ITEMS_ALIGN', this._commandTextAlignment);
    return this._commandTextAlignment.toLowerCase();
  }

  drawIcon(iconIndex, x, y) {
    const bitmap = ImageManager.loadSystem(this._iconset);
    const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx = (iconIndex % 16) * pw;
    const sy = Math.floor(iconIndex / 16) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
  }

  opened() {
    this._openness = 255;
    this.visible = true;
    this.activate();
  }

  //mute
  playCursorSound() {
    // SoundManager.playCursor();
  }

  playOkSound() {
    // SoundManager.playOk();
  }

  playBuzzerSound() {
    // SoundManager.playBuzzer();
  }

  processCancel() {
    // SoundManager.playCancel();
    this.updateInputData();
    this.deactivate();
    this.callCancelHandler();
  }
}