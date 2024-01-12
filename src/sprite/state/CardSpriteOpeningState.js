class CardSpriteOpeningState {
  _cardSprite;
  
  constructor(cardSprite) {
      this._cardSprite = cardSprite;
  }

  updateState() {
    const that = this._cardSprite;
    if (that._x !== that.x || that.width < that.cardOriginalWidth()) {
      this.updateOpening();
      that.refresh();
    } else {
      that.opened();
    }
  }

  updateOpening() {
    const that = this._cardSprite;
    const interval = that.calculateInterval(0, that.cardOriginalWidth(), 0.5);
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