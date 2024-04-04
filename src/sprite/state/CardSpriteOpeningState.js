class CardSpriteOpeningState {
  _card;
  
  constructor(sprite) {
    this._card = sprite;
  }

  updateState() {
    const that = this._card;
    if (that._x !== that.x || that.width < that.cardOriginalWidth()) {
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
    if (that._x !== that.x) {
      that.x -= interval;
    }
    if (that.width > that.cardOriginalWidth()) that.width = that.cardOriginalWidth();
    if (that._x > that.x) that.x = that._x;
  }
}