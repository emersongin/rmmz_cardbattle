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
    this._colorTone = GameConst.BLUE_COLOR;
  }

  setRedColor() {
    this._colorTone = GameConst.RED_COLOR;
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
}