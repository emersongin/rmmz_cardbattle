class CardSpriteMovingState {
  _cardSprite;
  
  constructor(cardSprite) {
    this._cardSprite = cardSprite;
  }

  updateState() {
    const that = this._cardSprite;
    if (that._x !== that.x || that._y !== that.y) {
      this.updateMovingPosition();
    } else {
      that.stop();
    }
  }

  updateMovingPosition() {
    const that = this._cardSprite;
    const interval = that.calculateInterval(0, Graphics.boxWidth, that._duration);
    const reachedX = that.x > that._x;
    const reachedY = that.y > that._y;
    if (that._x !== that.x) {
      that.x = that.x > that._x 
        ? that.x - interval 
        : that.x + interval;
    }
    const xLimit = (reachedX && that.x < that._x || !reachedX && that.x > that._x);
    if (xLimit) that.x = that._x;
    if (that._y !== that.y) {
      that.y = that.y > that._y 
        ? that.y - interval 
        : that.y + interval;
    }
    const yLimit = (reachedY && that.y < that._y || !reachedY && that.y > that._y);
    if (yLimit) that.y = that._y;
  }

}