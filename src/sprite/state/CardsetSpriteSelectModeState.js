class CardsetSpriteSelectModeState {
  _cardset;
  _cursorIndex;
  
  constructor(sprite) {
    this._cardset = sprite;
    this._cursorIndex = 0;
    this.updateSpriteCards();
  }

  updateState() {
    if (this._cardset.isNoBusy()) this.updateCursor();
    if (Input.isAnyKeyActive() && this._cardset.isNoBusy()) this.updateSpriteCards();
  }

  updateCursor() {
    if (Input.isRepeated('right') || Input.isLongPressed('right')) {
      this.moveCursorRight();
    } else if (Input.isRepeated('left') || Input.isLongPressed('left')) {
      this.moveCursorLeft();
    }
  }

  moveCursorRight(times = 1) {
    const sprites = this._cardset._sprites;
    const indexsAmount = sprites.length - 1;
    if (this._cursorIndex < indexsAmount) {
      const nextIndex = this._cursorIndex + times;
      this._cursorIndex = nextIndex > indexsAmount ? indexsAmount : nextIndex;
    }
  }

  moveCursorLeft(times = 1) {
    const minIndex = 0;
    if (this._cursorIndex > minIndex) {
      const nextIndex = this._cursorIndex - times;
      this._cursorIndex = nextIndex < minIndex ? minIndex : nextIndex;
    }
  }

  updateSpriteCards() {
    const cardset = this._cardset;
    const sprites = cardset._sprites;
    const indexsAmount = sprites.length - 1;
    sprites.forEach((sprite, index) => {
      if (index === this._cursorIndex) {
        this.hoverSprite(sprite);
        cardset.removeChild(sprite);
        cardset.addChildAt(sprite, indexsAmount);
      } else {
        this.unhoverSprite(sprite);
        cardset.removeChild(sprite);
        const fixLastCardindex = (index === indexsAmount ? indexsAmount - 1 : index);
        cardset.addChildAt(sprite, fixLastCardindex);
      }
    });
  }

  hoverSprite(sprite) {
    const destinyXPosition = sprite.x;
    const destinyYPosition = -10;
    const duration = 0.03;
    sprite.hover();
    sprite.toMove(destinyXPosition, destinyYPosition, sprite.x, sprite.y, duration);
  }

  unhoverSprite(sprite) {
    const destinyXPosition = sprite.x;
    const destinyYPosition = 0;
    const duration = 0.03;
    sprite.unhover();
    sprite.toMove(destinyXPosition, destinyYPosition, sprite.x, sprite.y, duration);
  }
}