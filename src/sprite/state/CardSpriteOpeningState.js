class CardSpriteOpeningState {
  _card;
  _x;
  
  constructor(sprite, xPositionOpening) {
    this._card = sprite;
    this._x = xPositionOpening;
  }

  updateState() {
    const that = this._card;
    if (this._x !== that.x || that.width < that.cardOriginalWidth()) {
      this.updateOpening();
      that.refresh();
    } else {
      that.opened();
    }
  }

  updateOpening() {
    const that = this._card;
    const interval = that.calculateMovingInterval(0, that.cardOriginalWidth(), that._duration);
    if (that.width < that.cardOriginalWidth()) {
      that.width += (interval * 2);
    }
    if (this._x !== that.x) {
      that.x -= interval;
    }
    if (that.width > that.cardOriginalWidth()) that.width = that.cardOriginalWidth();
    if (this._x > that.x) that.x = this._x;
  }
}