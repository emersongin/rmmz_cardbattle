class CardsetSpriteSelectModeState {
  _cardset;
  _cursorIndex;
  
  constructor(sprite) {
    this._cardset = sprite;
    this._cursorIndex = 0;
    this.updateSpriteCards();
  }

  updateStatus() {
    const cardset = this._cardset;
    const keys = ['right', 'left'];
    if (cardset.isAvailable()) {
      this.updateCursor();
      if (Input.isAnyKeyActiveIn(keys)) this.updateSpriteCards();
      if (cardset._enableSelected) {
        if (Input.isTriggered('ok')) this.selectSprite();
        if (Input.isTriggered('cancel') || this.selecteLimit()) cardset.unselectMode();
      }
    }
  }

  selecteLimit() {
    const cardset = this._cardset;
    const allowedAmount = cardset._sprites.filter(sprite => sprite.isEnabled()).length;
    const selectedAmount = cardset._selectedIndexs.length;
    return selectedAmount === allowedAmount;
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
    } else {
      this._cursorIndex = 0;
    }
  }

  moveCursorLeft(times = 1) {
    const minIndex = 0;
    const sprites = this._cardset._sprites;
    const indexsAmount = sprites.length - 1;
    if (this._cursorIndex > minIndex) {
      const nextIndex = this._cursorIndex - times;
      this._cursorIndex = nextIndex < minIndex ? minIndex : nextIndex;
    } else {
      this._cursorIndex = indexsAmount;
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
    sprite.commandHover();
    const move = CardSprite.createMove(destinyXPosition, destinyYPosition, sprite.x, sprite.y, duration);
    sprite.commandMoving([move]);
  }

  unhoverSprite(sprite) {
    const destinyXPosition = sprite.x;
    const destinyYPosition = 0;
    const duration = 0.03;
    sprite.commandUnhover();
    const move = CardSprite.createMove(destinyXPosition, destinyYPosition, sprite.x, sprite.y, duration);
    sprite.commandMoving([move]);
  }

  selectSprite() {
    const cardset = this._cardset;
    const sprites = cardset._sprites;
    const selectedSprite = sprites[this._cursorIndex];
    if (selectedSprite.isDisabled()) return;
    if (this.isSelectedSprite()) {
      selectedSprite.unselect();
      this.removeSelectedIndex(this._cursorIndex);
      return;
    }
    selectedSprite.select();
    this.addSelectedIndex(this._cursorIndex);
  }

  isSelectedSprite() {
    const cardset = this._cardset;
    return cardset._selectedIndexs.find(index => index === this._cursorIndex);
  }

  addSelectedIndex(index) {
    const cardset = this._cardset;
    cardset._selectedIndexs.push(index);
  }

  removeSelectedIndex(index) {
    const cardset = this._cardset;
    cardset._selectedIndexs = cardset._selectedIndexs.filter(selectedIndex => selectedIndex !== index);
  }
}