class CardSpriteStoppedState {
  _cardSprite;
  
  constructor(cardSprite) {
    this._cardSprite = cardSprite;
  }

  updateState() {
    this.updateBackground();
    this.updateFlash();
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

  updateFlash() {
    const that = this._cardSprite;
    if (that._flashDuration > 0) {
      that._flashDuration--;
      this.updateFlashOpacity();
    }
  }

  updateFlashOpacity() {
    const that = this._cardSprite;
    that._flashLayer.opacity = (that._flashDuration * 100 / 20);
    if (that._flashDuration === 0) {
      that._flashColor = null;
    }
  }
}