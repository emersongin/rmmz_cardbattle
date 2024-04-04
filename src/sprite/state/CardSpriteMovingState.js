class CardSpriteMovingState {
  _card;
  _xInterval;
  _yInterval;
  _x;
  _y;
  
  constructor(sprite, destinyXPosition, destinyYPosition, originXPosition, originYPosition) {
    this._card = sprite;
    this._x = destinyXPosition;
    this._y = destinyYPosition;
    const duration = this._card._duration;
    this._xInterval = this._card.calculateMovingInterval(originXPosition, destinyXPosition, duration);
    this._yInterval = this._card.calculateMovingInterval(originYPosition, destinyYPosition, duration);
  }

  updateState() {
    const that = this._card;
    if (this._x !== that.x || this._y !== that.y) {
      this.updateXPosition();
      this.updateYPosition();
    } else {
      that.stop();
    }
  }

  updateXPosition() {
    const that = this._card;
    const reached = that.x > this._x;
    if (this._x !== that.x) {
      that.x = reached ? that.x - this._xInterval : that.x + this._xInterval;
    }
    const limit = (reached && that.x < this._x || !reached && that.x > this._x);
    if (limit) that.x = this._x;
  }

  updateYPosition() {
    const that = this._card;
    const reached = that.y > this._y;
    if (this._y !== that.y) {
      that.y = reached ? that.y - this._yInterval : that.y + this._yInterval;
    }
    const limit = (reached && that.y < this._y || !reached && that.y > this._y);
    if (limit) that.y = this._y;
  }

}