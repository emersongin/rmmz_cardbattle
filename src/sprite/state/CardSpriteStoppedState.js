class CardSpriteStoppedState {
  _cardSprite;
  
  constructor(cardSprite) {
    this._cardSprite = cardSprite;
  }

  updateState() {
    this.updatePoints();
  }

  updatePoints() {
    // this._cardSprite._points = this._cardSprite._points + 1;
  }
}