class CardSpriteAnimatedState {
  _cardSprite;
  
  constructor(cardSprite) {
      this._cardSprite = cardSprite;
  }

  updateState() {
    const that = this._cardSprite;
    // console.log(that._animationSprite && !that._animationSprite.isPlaying());
    if (that._animationSprite && !that._animationSprite.isPlaying()) {
      that.refreshAndStop();
    }
  }
}