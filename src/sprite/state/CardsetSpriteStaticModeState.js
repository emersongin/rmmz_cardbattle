class CardsetSpriteStaticModeState {
  _cardset;
  
  constructor(sprite) {
    this._cardset = sprite;
    this.unhouverSprites();
  }

  unhouverSprites() {
    const spritesHovered = this.getSpritesHovered();
    spritesHovered.forEach(({ sprite, index }) => {
      this.unhoverSprite(sprite);
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

  unhoverSprite(sprite) {
    const destinyXPosition = sprite.x;
    const destinyYPosition = 0;
    const duration = 0.03;
    sprite.unhover();
    sprite.toMove(destinyXPosition, destinyYPosition, sprite.x, sprite.y, duration);
  }

  updateStatus() {
    // nothing
  }
}