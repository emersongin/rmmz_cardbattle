class CardSpriteStoppedState {
  _card;
  
  constructor(sprite) {
    if (!(sprite instanceof CardSprite)) {
      throw new Error('sprite is not a CardSprite instance!');
    }
    this._card = sprite;
  }

  updateStatus() {
    // nothing
  }
}