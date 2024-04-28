class GamePointsWindowUpdatedState {
  _window;
  _attack;
  _health;
  _interval = 0;
  _counter = 0;

  constructor(window, attackPoints, healthPoints) {
    console.log(attackPoints, healthPoints);
    this._window = window;
    this._attack = attackPoints;
    this._health = healthPoints;
    this.calculateInterval();
  }

  calculateInterval() {
    const that = this._window;
    const atk = Math.abs(that._attackPoints - this._attack);
    const hlt = Math.abs(that._healthPoints - this._health);
    const points = IntegerHelper.findBigger(atk, hlt);
    const fps = 30;
    this._interval = Math.floor(fps / (points || 1)) || 1;
  }

  updateStatus() {
    const that = this._window;
    if (this._counter) return this._counter--;
    if (this.isToUpdate()) {
      if (this.isToUpdateAttack()) {
        that._attackPoints = this.getUpdatePoints(this._attack, that._attackPoints);
      }
      if (this.isToUpdateHealth()) {
        that._healthPoints = this.getUpdatePoints(this._health, that._healthPoints);
      }
      that.refresh();
      this._counter = this._interval;
    } else {
      that.stop();
    }
  }

  getUpdatePoints(updatePoints, points) {
    return points > updatePoints ? points - 1 : points + 1;
  }

  isToUpdate() {
    return this.isToUpdateAttack() || this.isToUpdateHealth();
  }

  isToUpdateAttack() {
    return this._window._attackPoints !== this._attack;
  }

  isToUpdateHealth() {
    return this._window._healthPoints !== this._health;
  }
}