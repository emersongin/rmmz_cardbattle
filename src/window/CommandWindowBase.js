class CommandWindowBase extends Window_Command {
  static create(x, y, title, commands = [], handlers = []) {
    const width = Graphics.boxWidth;
    const height = CommandWindowBase.minHeight() * Math.max((commands.length + (title ? 1 : 0)), 1);
    const rect = new Rectangle(x, y, width, height);
    if (commands.length !== handlers.length) {
      throw new Error('Commands and handlers must have the same length!');
    }
    return new CommandWindowBase(rect, title, commands, handlers);
  }

  static minHeight() {
    return 60;
  }

  static createCommand(name, symbol, enabled = true, ext = null) {
    return { name, symbol, enabled, ext };
  }

  initialize(rect, title, commands, handlers) {
    super.initialize(rect);
    this._actions = [];
    this._windowColor = GameConst.DEFAULT_COLOR;
    this._commands = commands || [];
    this._commandHandlers = handlers || [];
    this._title = title || '';
    this._titleTextAlignment = GameConst.LEFT;
    this._titleColor = ColorManager.textColor(GameColorIndexs.NORMAL_COLOR);
    this._commandTextAlignment = GameConst.LEFT;
    this._history = [];
    this.refresh();
    this.closed();
  }

  closed() {
    this._openness = 0;
    this.visible = false;
    this.deactivate();
  }

  refresh() {
    this.changeTextColor(this._titleColor);
    this.clearCommandList();
    this.makeCommandList();
    this.setHandlers();
    this.contents.clear();
    this.contentsBack.clear();
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
  
  drawAllItems() {
    this.drawTitle();
    if (this.hasCommands()) super.drawAllItems();
  }

  hasCommands() {
    return this.maxItems() > 0;
  }

  drawTitle() {
    if (!this._title) return;
    const rect = this.titleRect();
    const contentDrawed = this._title;
    this.addRecord('TITLE', contentDrawed);
    const aligment = this.getTitleTextAlignment();
    this.drawText(contentDrawed, rect.x, rect.y, rect.width, aligment);
  }

  addRecord(type, content) {
    const record = this.createRecord(type, content);
    this._history.push(record);
  }

  getRecordContent(type) {
    return this._history.find(record => record.type === type)?.content;
  }

  createRecord(type, content) {
    return { type, content };
  }

  titleRect() {
    const x = 0;
    const y = 0;
    const width = this.contentsWidth();
    const height = this.lineHeight();
    return new Rectangle(x, y, width, height);
  }

  itemRect(index) {
    const maxCols = this.maxCols();
    const itemWidth = this.itemWidth();
    const itemHeight = this.itemHeight();
    const colSpacing = this.colSpacing();
    const rowSpacing = this.rowSpacing();
    const title = this._title;
    const adicionalMargin = (title && title.length > 0) ? this.lineHeight() : 0;
    const col = index % maxCols;
    const row = Math.floor(index / maxCols);
    const x = col * itemWidth + colSpacing / 2 - this.scrollBaseX();
    const y = (row * itemHeight + rowSpacing / 2 - this.scrollBaseY()) + adicionalMargin;
    const width = itemWidth - colSpacing;
    const height = itemHeight - rowSpacing;
    return new Rectangle(x, y, width, height);
  }

  open() {
    this.addAction(this.commandOpen);
  }

  commandOpen() {
    if (this.isOpened()) return;
    this.visible = true;
    this.activate();
    super.open();
    return true;
  }

  isOpened() {
    return this._openness === 255;
  }

  isFullsize() {
    return this.width === Graphics.boxWidth;
  }

  alignTop() {
    this.addAction(this.commandAlign, GameConst.TOP);
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

  alignMiddle() {
    this.addAction(this.commandAlign, GameConst.MIDDLE);
  }

  commandAlign(verticalAlign) {
    if (this.isBusy()) return;
    this.setVerticalAlign(verticalAlign);
    this.setHorizontalAlign();
    return true;
  }

  setVerticalAlign(position) {
    this.y = CommandWindowBase.getVerticalAlign(position, this);
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

  setHorizontalAlign() {
    this.x = 0;
  }

  alignBottom() {
    this.addAction(this.commandAlign, GameConst.BOTTOM);
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

  itemTextAlign() {
    return this._commandTextAlignment.toLowerCase();
  }

  isTitleWasDrawing() {
    return this.getRecordContent('TITLE') !== undefined;
  }

  alignTitleCenter() {
    this._titleTextAlignment = GameConst.CENTER;
    this.refresh();
  }

  alignTitleRight() {
    this._titleTextAlignment = GameConst.RIGHT;
    this.refresh();
  }

  getTitleTextAlignment() {
    return this._titleTextAlignment.toLowerCase();
  }

  changeTitleColorToOrange() {
    this._titleColor = ColorManager.textColor(GameColorIndexs.ORANGE_COLOR);
    this.refresh();
  }

  getTitleColor() {
    return this._titleColor;
  }
}