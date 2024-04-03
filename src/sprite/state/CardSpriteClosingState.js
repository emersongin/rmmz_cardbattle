class CardSpriteClosingState {
  _card;
  
  constructor(sprite) {
    this._card = sprite;
  }

  updateState() {
    const that = this._card;
    if (that._x !== that.x || that.width > 0) {
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
    if (that._x !== that.x) {
      that.x += interval;
    }
    if (that.width < 0) that.width = 0;
    if (that._x < that.x) that.x = that._x;
  }
}