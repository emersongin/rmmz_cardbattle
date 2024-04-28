// include ./state/GamePointsWindowStoppedState.js
// include ./state/GamePointsWindowUpdatedState.js

class GamePointsWindow extends CardBattleWindow {
  initialize(rect) {
    super.initialize(rect);
    this._attackPoints = 0;
    this._healthPoints = 0;
    this._status = {};
    this.stop();
  }

  stop() {
    this.changeStatus(GamePointsWindowStoppedState);
  }

  changeStatus(status, ...params) {
    this._status = new status(this, ...params);
  }

  static create(x, y) {
    const width = Graphics.boxWidth / 4;
    const height = CardBattleWindow.minHeight();
    return new GamePointsWindow(new Rectangle(x, y, width, height));
  }

  refresh() {
    super.refresh();
    this.drawPoints();
  }

  drawPoints() {
    const attack = StringHelper.convertPointsDisplay(this._attackPoints);
    const health = StringHelper.convertPointsDisplay(this._healthPoints);
    const points = `AP ${attack} HP ${health}`;
    this.contents.drawText(
      points, 
      0, 
      0, 
      this.contents.width, 
      this.contents.height,
      'center'
    );
  }

  changePoints(attackPoints = this._attackPoints, healthPoints = this._healthPoints) {
    if (this.isUpdating()) return;
    this.changeStatus(GamePointsWindowUpdatedState, attackPoints, healthPoints);
  }

  getStatus() {
    return this._status;
  }

  isUpdating() {
    return this.getStatus() instanceof GamePointsWindowUpdatedState;
  }

  isStopped() {
    return this.getStatus() instanceof GamePointsWindowStoppedState;
  }

  reset() {
    if (this.isUpdating()) return;
    this._attackPoints = 0;
    this._healthPoints = 0;
    this.refresh();
  }

  update() {
    if (this.getStatus()) this._status.updateStatus();
    super.update();
  }
}