// include ./WindowStoppedState.js
// include ./WindowUpdateState.js

class StateWindow extends Window_Base {
  static createWindowOneFourthSize(x, y) {
    const width = ScreenHelper.getOneFourthWidth();
    const height = StateWindow.borderHeight() * 2;
    return StateWindow.create(x, y, width, height);
  }

  static borderHeight() {
    return 12;
  }

  static minHeight() {
    return 60;
  }

  static createWindowMiddleSize(x, y) {
    const width = ScreenHelper.getHalfWidth();
    const height = StateWindow.borderHeight() * 2
    return StateWindow.create(x, y, width, height);
  }

  static createWindowFullSize(x, y) {
    const width = ScreenHelper.getFullWidth();
    const height = StateWindow.borderHeight() * 2
    return StateWindow.create(x, y, width, height);
  }

  static create(x, y, width, height) {
    return new StateWindow(new Rectangle(x, y, width, height));
  }

  initialize(rect) {
    super.initialize(rect);
    this._iconset = "IconSet";
    this._status = {};
    this._actionQueue = new ActionQueue(this);
    this._windowColor = GameConst.DEFAULT_COLOR;
    this.closed();
    this.stop();
  }

  reset() {
    this.refresh();
  }

  refresh() {
    this.contents.clear();
  }

  closed() {
    this._openness = 0;
    this.hide();
  }

  stop() {
    this.changeStatus(WindowStoppedState);
  }

  changeStatus(status, ...params) {
    this._status = new status(this, ...params);
  }

  update() {
    super.update();
    if (this.hasActions() && this.isStopped() && this.isAvailable()) this.executeAction();
    if (this.isOpen() && this.getStatus()) this._status.updateStatus();
    this.updateTone();
  }

  hasActions() {
    return this._actionQueue.hasActions();
  }

  isStopped() {
    return this.getStatus() instanceof WindowStoppedState;
  }

  isAvailable() {
    return !this.isBusy();
  }

  isBusy() {
    return this.isOpening() || this.isClosing() || this.isUpdating();
  }

  isUpdating() {
    return this.getStatus() instanceof WindowUpdateState;
  }

  executeAction() {
    this._actionQueue.executeAction();
  }

  getStatus() {
    return this._status;
  }

  updateTone() {
    switch (this._windowColor) {
      case GameConst.BLUE_COLOR:
        this.setTone(0, 0, 155);
        break;
      case GameConst.RED_COLOR:
        this.setTone(155, 0, 0);
        break;
      default:
        this.setTone(0, 0, 0);
    }
  }

  open() {
    this.addAction(this.commandOpen);
  }

  addAction(fn, ...params) {
    this._actionQueue.addAction(fn, ...params);
  }

  commandOpen() {
    if (!(this.isStopped() && this.isClosed())) return false;
    this.show();
    super.open();
  }

  close() {
    this.addAction(this.commandClose);
  }

  commandClose() {
    if (!(this.isStopped() && this.isOpen())) return false;
    super.close();
  }

  changeBlueColor() {
    this.addAction(this.commandChangeBlueColor);
  }

  commandChangeBlueColor() {
    if (!this.isStopped()) return false;
    this._windowColor = GameConst.BLUE_COLOR;
  }

  changeRedColor() {
    this.addAction(this.commandChangeRedColor);
  }

  commandChangeRedColor() {
    if (!this.isStopped()) return false;
    this._windowColor = GameConst.RED_COLOR;
  }

  changeDefaultColor() {
    this.addAction(this.commandChangeDefaultColor);
  }

  commandChangeDefaultColor() {
    if (!this.isStopped()) return false;
    this._windowColor = GameConst.DEFAULT_COLOR;
  }

  alignStartTop() {
    const x = ScreenHelper.getStartPosition();
    const y = ScreenHelper.getTopPosition();
    this.addAction(this.commandAlign, x, y);
  }

  alignCenterTop() {
    const x = ScreenHelper.getCenterPosition(this.width);
    const y = ScreenHelper.getTopPosition();
    this.addAction(this.commandAlign, x, y);
  }

  alignEndTop() {
    const x = ScreenHelper.getEndPosition(this.width);
    const y = ScreenHelper.getTopPosition();
    this.addAction(this.commandAlign, x, y);
  }

  alignStartMiddle() {
    const x = ScreenHelper.getStartPosition();
    const y = ScreenHelper.getMiddlePosition(this.height);
    this.addAction(this.commandAlign, x, y);
  }

  alignCenterAboveMiddle() {
    const x = ScreenHelper.getCenterPosition(this.width);
    const y = ScreenHelper.getAboveMiddlePosition(this.height);
    this.addAction(this.commandAlign, x, y);
  }

  alignEndAboveMiddle() {
    const x = ScreenHelper.getEndPosition(this.width);
    const y = ScreenHelper.getAboveMiddlePosition(this.height);
    this.addAction(this.commandAlign, x, y);
  }

  alignCenterMiddle() {
    const x = ScreenHelper.getCenterPosition(this.width);
    const y = ScreenHelper.getMiddlePosition(this.height);
    this.addAction(this.commandAlign, x, y);
  }

  alignCenterBelowMiddle() {
    const x = ScreenHelper.getCenterPosition(this.width);
    const y = ScreenHelper.getBelowMiddlePosition(this.height);
    this.addAction(this.commandAlign, x, y);
  }

  alignEndBelowMiddle() {
    const x = ScreenHelper.getEndPosition(this.width);
    const y = ScreenHelper.getBelowMiddlePosition(this.height);
    this.addAction(this.commandAlign, x, y);
  }

  alignEndMiddle() {
    const x = ScreenHelper.getEndPosition(this.width);
    const y = ScreenHelper.getMiddlePosition(this.height);
    this.addAction(this.commandAlign, x, y);
  }

  alignStartBottom() {
    const x = ScreenHelper.getStartPosition();
    const y = ScreenHelper.getBottomPosition(this.height);
    this.addAction(this.commandAlign, x, y);
  }

  alignCenterBottom() {
    const x = ScreenHelper.getCenterPosition(this.width);
    const y = ScreenHelper.getBottomPosition(this.height);
    this.addAction(this.commandAlign, x, y);
  }

  alignEndBottom() {
    const x = ScreenHelper.getEndPosition(this.width);
    const y = ScreenHelper.getBottomPosition(this.height);
    this.addAction(this.commandAlign, x, y);
  }

  alignAboveOf(obj) {
    const { y } = obj;
    const receptorX = undefined;
    const receptorY = ScreenHelper.getPositionAboveOf(y, this.height);
    this.addAction(this.commandAlign, receptorX, receptorY);
  }

  alignBelowOf(obj) {
    const { y, height } = obj;
    const receptorX = undefined;
    const receptorY = ScreenHelper.getPositionBelowOf(y, height);
    this.addAction(this.commandAlign, receptorX, receptorY);
  }

  commandAlign(x = this.x, y = this.y) {
    if (!this.isStopped()) return false;
    this.x = x;
    this.y = y;
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

  isBlueColor() {
    return this._windowColor === GameConst.BLUE_COLOR;
  }

  isRedColor() {
    return this._windowColor === GameConst.RED_COLOR;
  }

  isDefaultColor() {
    return this._windowColor === GameConst.DEFAULT;
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
    this.show();
    this.activate();
  }

  isOpen() {
    return super.isOpen();
  }
}