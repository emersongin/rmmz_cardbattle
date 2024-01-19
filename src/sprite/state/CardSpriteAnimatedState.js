class CardSpriteAnimatedState {
  _cardSprite;
  
  constructor(cardSprite) {
      this._cardSprite = cardSprite;
  }

  updateState() {
    const that = this._cardSprite;
    if (that._animationSprite && !that._animationSprite.isPlaying()) {
      that.refreshAndStop();
    }
  }
}