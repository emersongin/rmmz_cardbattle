class CardSpriteStoppedState {
  _cardSprite;
  
  constructor(cardSprite) {
      this._cardSprite = cardSprite;
  }

  updateState() {
    this.updateBackground();
  }

  updateBackground() {
    const that = this._cardSprite;
    that._backgroundLayer.bitmap.clear();
    if (that._highlighted || that._selected) {
      this.fillBackground();
      this.updateBackgroundPulse();
    }
  }

  fillBackground() {
    const that = this._cardSprite;
    this.fillSelectBackground();
    this.fillHighlightBackground();
  }

  fillSelectBackground() {
    const that = this._cardSprite;
    if (that._highlighted) {
      that._backgroundLayer.bitmap.fillRect(0, 0, that.width, that.height, 'red');
    }
  }

  fillHighlightBackground() {
    const that = this._cardSprite;
    if (that._highlighted) {
      that._backgroundLayer.bitmap.fillRect(0, 0, that.width, that.height, 'yellow');
    }
  }

  updateBackgroundPulse() {
    const that = this._cardSprite;
    that._backgroundLayer.opacity -= 32;
    if(that._backgroundLayer.opacity <= 0) {
      that._backgroundLayer.opacity = 255;
    }
  }
}