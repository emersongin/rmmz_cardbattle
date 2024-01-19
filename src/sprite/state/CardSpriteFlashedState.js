class CardSpriteFlashedState {
  _cardSprite;
  
  constructor(cardSprite) {
    this._cardSprite = cardSprite;
  }

  updateState() {
    this.updateFlash();
  }

  updateFlash() {
    const that = this._cardSprite;
    if (that._flashDuration > 0) {
      that._flashDuration--;
      this.updateFlashOpacity();
    } else {
      that.changeState(CardSpriteStoppedState);
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