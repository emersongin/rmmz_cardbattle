class AskWindow extends Window_Command {
  static createWindowFullSize(x, y, askText, commands = []) {
    const width = Graphics.boxWidth;
    const height = AskWindow.minHeight() * Math.max(commands.length, (askText ? 2 : 1));
    return AskWindow.create(x, y, width, height, askText, commands);
  }

  static minHeight() {
    return 76;
  }

  static create(x, y, width, height, askText, commands) {
    return new AskWindow(new Rectangle(x, y, width, height), askText, commands);
  }

  initialize(rect, askText, commands) {
    super.initialize(rect);
    this._actions = [];
    this._windowColor = GameConst.DEFAULT_COLOR;
    this._askText = askText || '';
    this._commands = commands || [];
    this._textAlignment = 'left';
    this.refresh();
    this.closed();
  }

  closed() {
    this._openness = 0;
    this.visible = false;
    this.deactivate();
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

  alignTop() {
    this.addAction(this.commandAlign, GameConst.TOP);
  }

  alignMiddle() {
    this.addAction(this.commandAlign, GameConst.MIDDLE);
  }

  alignBottom() {
    this.addAction(this.commandAlign, GameConst.BOTTOM);
  }

  commandAlign(verticalAlign) {
    if (this.isBusy()) return;
    this.setVerticalAlign(verticalAlign);
    this.setHorizontalAlign();
    return true;
  }

  setVerticalAlign(position) {
    this.y = AskWindow.getVerticalAlign(position, this);
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

  static createCommand(name, symbol, enabled = true, ext = null) {
    return { name, symbol, enabled, ext };
  }

  refresh(commands) {
    this.clearCommandList();
    this.makeCommandList(commands);
    this.contents.clear();
    this.contentsBack.clear();
    this.drawAllItems();
  }

  drawAllItems() {
    this.drawText(this._askText, 0, 0);
    super.drawAllItems();
  }

  makeCommandList() {
    if (!this._commands || (Array.isArray(this._commands) && this._commands.length === 0)) return;
    this._commands.forEach(command => {
      const { name, symbol, enabled, ext } = command;
      this.addCommand(name, symbol, enabled, ext);
    });
  }

  itemRect(index) {
    const maxCols = this.maxCols();
    const itemWidth = this.itemWidth();
    const itemHeight = this.itemHeight();
    const colSpacing = this.colSpacing();
    const rowSpacing = this.rowSpacing();
    const askText = this._askText;
    const adicionalMargin = (askText && askText.length > 0) ? this.lineHeight() : 0;
    const col = index % maxCols;
    const row = Math.floor(index / maxCols);
    const x = col * itemWidth + colSpacing / 2 - this.scrollBaseX();
    const y = (row * itemHeight + rowSpacing / 2 - this.scrollBaseY()) + adicionalMargin;
    const width = itemWidth - colSpacing;
    const height = itemHeight - rowSpacing;
    return new Rectangle(x, y, width, height);
  }
  
  itemTextAlign() {
    return this._textAlignment;
  }
}