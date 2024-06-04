class CardsetSpriteStaticModeState {
  _cardset;
  
  constructor(sprite) {
    if (!(sprite instanceof CardsetSprite)) {
      throw new Error('sprite is not a CardsetSprite instance!');
    }
    this._cardset = sprite;
    this.unhouverSprites();
  }

  staticMode() {
    return false;
  }

  selectMode(selectHandler, number) {
    this._cardset.changeStatus(CardsetSpriteSelectModeState, selectHandler, number);
  }

  unhouverSprites() {
    const spritesHovered = this.getSpritesHovered();
    spritesHovered.forEach(({ sprite, index }) => {
      this.resetSprite(sprite);
      this._cardset.removeChild(sprite);
      this._cardset.addChildAt(sprite, index);
    });
  }

  getSpritesHovered() {
    const sprites = this._cardset._sprites.map((sprite, index) => {
      return { sprite, index };
    });
    return sprites.filter(({ sprite, index }) => sprite.isHovered());
  }

  resetSprite(sprite) {
    // const destinyXPosition = sprite.x;
    // const destinyYPosition = 0;
    // const duration = 0.03;
    sprite.unhover();
    sprite.unselect();
    sprite.uniluminate();
    // const move = CardSprite.createMove(destinyXPosition, destinyYPosition, sprite.x, sprite.y, duration);
    // sprite.toMove(move);
  }

  updateStatus() {
    // nothing
  }
}