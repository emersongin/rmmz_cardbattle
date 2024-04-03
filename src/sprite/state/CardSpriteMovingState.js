class CardSpriteMovingState {
  _card;
  _xInterval;
  _yInterval;
  
  constructor(sprite) {
    this._card = sprite;
    const duration = this._card._duration;
    const originXPosition = this._card.x;
    const originYPosition = this._card.y;
    const destinyXPosition = this._card._x;
    const destinyYPosition = this._card._y;
    this._xInterval = this._card.calculateMovingInterval(originXPosition, destinyXPosition, duration);
    this._yInterval = this._card.calculateMovingInterval(originYPosition, destinyYPosition, duration);
  }

  updateState() {
    const that = this._card;
    if (that._x !== that.x || that._y !== that.y) {
      this.updateXPosition();
      this.updateYPosition();
    } else {
      that.stop();
    }
  }

  updateXPosition() {
    const that = this._card;
    const reached = that.x > that._x;
    if (that._x !== that.x) {
      that.x = reached ? that.x - this._xInterval : that.x + this._xInterval;
    }
    const limit = (reached && that.x < that._x || !reached && that.x > that._x);
    if (limit) that.x = that._x;
  }

  updateYPosition() {
    const that = this._card;
    const reached = that.y > that._y;
    if (that._y !== that.y) {
      that.y = reached ? that.y - this._yInterval : that.y + this._yInterval;
    }
    const limit = (reached && that.y < that._y || !reached && that.y > that._y);
    if (limit) that.y = that._y;
  }

}