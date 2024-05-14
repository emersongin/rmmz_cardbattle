// include ./state/WindowStoppedState.js
// include ./state/WindowUpdatedState.js

class CardBattleWindowBase extends Window_Base {
  initialize(rect) {
    super.initialize(rect);
    this._iconset = "IconSet";
    this._status = {};
    this._actions = [];
    this._windowColor = GameConst.BLUE_COLOR;
    this.closed();
    this.stop();
  }

  closed() {
    this._openness = 0;
    this.visible = false;
  }

  stop() {
    this.changeStatus(WindowStoppedState);
  }

  changeStatus(status, ...params) {
    this._status = new status(this, ...params);
  }

  reset() {
    this.refresh();
  }

  refresh() {
    this.contents.clear();
  }

  static create(x, y, width, height) {
    return new CardBattleWindowBase(new Rectangle(x, y, width, height));
  }

  static createWindowOneFourthSize(x, y) {
    const width = Graphics.boxWidth / 4;
    const height = CardBattleWindowBase.minHeight();
    return CardBattleWindowBase.create(x, y, width, height);
  }

  static minHeight() {
    return 60;
  }

  static createWindowMiddleSize(x, y) {
    const width = Graphics.boxWidth / 2;
    const height = CardBattleWindowBase.minHeight();
    return CardBattleWindowBase.create(x, y, width, height);
  }

  static createWindowThreeFourthSize(x, y) {
    const width = Graphics.boxWidth * 3 / 4;
    const height = CardBattleWindowBase.minHeight();
    return CardBattleWindowBase.create(x, y, width, height);
  }

  static createWindowFullSize(x, y) {
    const width = Graphics.boxWidth;
    const height = CardBattleWindowBase.minHeight();
    return CardBattleWindowBase.create(x, y, width, height);
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

  update() {
    super.update();
    if (this.hasActions() && this.isStopped() && this.isAvailable()) this.executeAction();
    if (this.isOpen() && this.getStatus()) this._status.updateStatus();
    this.updateTone();
  }

  hasActions() {
    return this._actions.length > 0;
  }

  isStopped() {
    return this.getStatus() instanceof WindowStoppedState;
  }

  executeAction() {
    const action = this._actions[0];
    const executed = action.execute();
    if (executed) {
      this._actions.shift();
    }
  }

  getStatus() {
    return this._status;
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

  commandOpen() {
    if (!(this.isStopped() && this.isClosed())) return;
    this.visible = true;
    super.open();
    return true;
  }

  close() {
    this.addAction(this.commandClose);
  }

  commandClose() {
    if (!(this.isStopped() && this.isOpened())) return;
    this.visible = false;
    super.close();
    return true;
  }

  isOpened() {
    return this._openness === 255;
  }

  drawIcon(iconIndex, x, y) {
    const bitmap = ImageManager.loadSystem(this._iconset);
    const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx = (iconIndex % 16) * pw;
    const sy = Math.floor(iconIndex / 16) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
  };

  changeBlueColor() {
    this.addAction(this.commandChangeBlueColor);
  }

  commandChangeBlueColor() {
    if (!this.isStopped()) return;
    this._windowColor = GameConst.BLUE_COLOR;
    return true;
  }

  changeRedColor() {
    this.addAction(this.commandChangeRedColor);
  }

  commandChangeRedColor() {
    if (!this.isStopped()) return;
    this._windowColor = GameConst.RED_COLOR;
    return true;
  }

  changeDefaultColor() {
    this.addAction(this.commandChangeDefaultColor);
  }

  commandChangeDefaultColor() {
    if (!this.isStopped()) return;
    this._windowColor = GameConst.DEFAULT_COLOR;
    return true;
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

  alignStartTop() {
    this.addAction(this.commandAlign, GameConst.START, GameConst.TOP);
  }

  alignCenterTop() {
    this.addAction(this.commandAlign, GameConst.CENTER, GameConst.TOP);
  }

  alignEndTop() {
    this.addAction(this.commandAlign, GameConst.END, GameConst.TOP);
  }

  alignStartMiddle() {
    this.addAction(this.commandAlign, GameConst.START, GameConst.MIDDLE);
  }

  alignCenterMiddle() {
    this.addAction(this.commandAlign, GameConst.CENTER, GameConst.MIDDLE);
  }

  alignEndMiddle() {
    this.addAction(this.commandAlign, GameConst.END, GameConst.MIDDLE);
  }

  alignStartBottom() {
    this.addAction(this.commandAlign, GameConst.START, GameConst.BOTTOM);
  }

  alignCenterBottom() {
    this.addAction(this.commandAlign, GameConst.CENTER, GameConst.BOTTOM);
  }

  alignEndBottom() {
    this.addAction(this.commandAlign, GameConst.END, GameConst.BOTTOM);
  }

  commandAlign(horizontalAlign, verticalAlign) {
    if (!this.isStopped()) return;
    this.setHorizontalAlign(horizontalAlign);
    this.setVerticalAlign(verticalAlign);
    return true;
  }

  setVerticalAlign(position) {
    this.y = CardBattleWindowBase.getVerticalAlign(position, this);
  }

  setHorizontalAlign(position) {
    this.x = CardBattleWindowBase.getHorizontalAlign(position, this);
  }

  static getVerticalAlign(position, window) {
    switch (position) {
      case GameConst.MIDDLE:
        return (Graphics.boxHeight / 2) - ((window.height || 0) / 2);
        break;
      case GameConst.BOTTOM:
        return Graphics.boxHeight - (window.height || 0);
        break;
      default: //TOP
        return 0;
    }
  }

  static getHorizontalAlign(position, window) {
    switch (position) {
      case GameConst.CENTER:
        return (Graphics.boxWidth / 2) - ((window.width || 0) / 2);
        break;
      case GameConst.END:
        return (Graphics.boxWidth - (window.width || 0));
        break;
      default: //START
        return 0;
    }
  }

  isOneFourthSize() {
    return this.width === Graphics.boxWidth / 4;
  }

  isMiddleSize() {
    return this.width === Graphics.boxWidth / 2;
  }

  isThreeFourthSize() {
    return this.width === Graphics.boxWidth * 3 / 4;
  }

  isFullsize() {
    return this.width === Graphics.boxWidth;
  }

  isCenterAligned() {
    return this.x === (Graphics.boxWidth / 2) - (this.width / 2) && 
      this.y === (Graphics.boxHeight / 2) - (this.height / 2);
  }

  itemHeightByIndex(index) {
    return this.itemHeight() * index;
  }

  isAvailable() {
    return !this.isBusy();
  }

  isBusy() {
    return this.isOpening() || this.isClosing() || this.isUpdating();
  }

  isUpdating() {
    return this.getStatus() instanceof WindowUpdatedState;
  }
}