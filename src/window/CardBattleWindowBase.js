class CardBattleWindowBase extends  Window_Base {
  initialize(rect) {
    super.initialize(rect);
    this._iconset = "IconSet";
    this._status = {};
    this._windowColor = GameConst.BLUE_COLOR;
    this.closed();
    this.stop();
    this.reset();
    this.setBlueColor();
  }

  closed() {
    this._openness = 0;
  }

  stop() {
    this.changeStatus(WindowStoppedState);
  }

  changeStatus(status, ...params) {
    this._status = new status(this, ...params);
  }

  getStatus() {
    return this._status;
  }

  reset() {
    this.refresh();
  }

  refresh() {
    this.contents.clear();
  }

  setBlueColor() {
    this._windowColor = GameConst.BLUE_COLOR;
  }

  setRedColor() {
    this._windowColor = GameConst.RED_COLOR;
  }

  update() {
    super.update();
    if (this.isOpen() && this.getStatus()) this._status.updateStatus();
    this.updateTone();
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

  static minHeight() {
    return 60;
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

  setCenteredAlignment() {
    this.x = CardBattleWindowBase.getHorizontalAlign(GameConst.CENTER, this);
    this.y = CardBattleWindowBase.getVerticalAlign(GameConst.MIDDLE, this);
  }

  setVerticalAlign(position) {
    this.y = CardBattleWindowBase.getVerticalAlign(position, this);
  }

  setHorizontalAlign(position) {
    this.x = CardBattleWindowBase.getHorizontalAlign(position, this);
  }

  isFullsize() {
    return this.width === Graphics.boxWidth;
  }

  isMiddleSize() {
    return this.width === Graphics.boxWidth / 2;
  }

  isCenterAligned() {
    return this.x === (Graphics.boxWidth / 2) - (this.width / 2) && 
      this.y === (Graphics.boxHeight / 2) - (this.height / 2);
  }

  itemHeightByIndex(index) {
    return this.itemHeight() * index;
  }
}