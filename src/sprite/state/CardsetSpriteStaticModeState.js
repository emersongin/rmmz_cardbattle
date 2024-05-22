class CardsetSpriteStaticModeState {
  _cardset;
  
  constructor(sprite) {
    if (!(sprite instanceof CardsetSprite)) {
      throw new Error('sprite is not a CardsetSprite instance!');
    }
    this._cardset = sprite;
  }

  updateStatus() {
    // nothing
  }
}