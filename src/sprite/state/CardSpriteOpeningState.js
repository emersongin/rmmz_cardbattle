class CardSpriteOpeningState {
  _card;
  _x;
  _isToOpen;
  _interval;
  
  constructor(sprite, xPosition) {
    this._card = sprite;
    const that = this._card;
    this._x = xPosition;
    this._isToOpen = xPosition < that.x;
    this._interval = that.calculateTimeInterval(0, that.cardOriginalWidth(), that._duration);
  }

  isToOpen() {
    return this._isToOpen;
  }

  isToClose() {
    return !this.isToOpen();
  }

  updateState() {
    const that = this._card;
    if (this.isUpdatingPosition() || this.isUpdatingWidth()) {
      this.updatePosition();
      this.updateWidth();
      that.refresh();
    }
    if (that.isOpened()) that.opened();
    if (that.isClosed()) that.closed();
  }

  isUpdatingPosition() {
    return this._x !== this._card.x;
  }

  updatePosition() {
    const that = this._card;
    if (this.isToOpen()) {
      that.x = that.x - this._interval;
      if (that.x < this._x) that.x = this._x;
    }
    if (this.isToClose()) {
      that.x = that.x + this._interval;
      if (that.x > this._x) that.x = this._x;
    }
    console.log(that.x);
  }

  isUpdatingWidth() {
    const that = this._card;
    return that.width < that.cardOriginalWidth() && that.width > 0;
  }

  updateWidth() {
    const that = this._card;
    if (this.isToOpen()) {
      that.width += (this._interval * 2);
      if (that.width > that.cardOriginalWidth()) that.width = that.cardOriginalWidth();
    }
    if (this.isToClose()) {
      that.width -= (this._interval * 2);
      if (that.width < 0) that.width = 0;
    }
  }
}