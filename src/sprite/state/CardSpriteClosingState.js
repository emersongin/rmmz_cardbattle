class CardSpriteClosingState {
  _card;
  _x;
  
  constructor(sprite, xPositionClosing) {
    this._card = sprite;
    this._x = xPositionClosing;
  }

  updateState() {
    const that = this._card;
    if (this._x !== that.x || that.width > 0) {
      this.updateClosing();
      that.refresh();
    } else {
      that.closed();
    }
  }

  updateClosing() {
    const that = this._card;
    const interval = that.calculateMovingInterval(0, that.cardOriginalWidth(), that._duration);
    if (that.width > 0) {
      that.width -= (interval * 2);
    }
    if (this._x !== that.x) {
      that.x += interval;
    }
    if (that.width < 0) that.width = 0;
    if (this._x < that.x) that.x = this._x;
  }
}