class CardsetSpriteSelectModeState {
  _cardset;
  _cursorIndex;
  _selectedIndexs;
  _selectNumber;
  _onSelectHandler;
  _onChangeCursor;
  _onCancelHandler;

  constructor(sprite, selectNumber = -1, onSelectHandler, onChangeCursor, onCancelHandler) {
    if (!(sprite instanceof CardsetSprite)) {
      throw new Error('sprite is not a CardsetSprite instance!');
    }
    if (typeof selectNumber !== 'number') {
      throw new Error('selectNumber is not a number!');
    }
    if (onSelectHandler && typeof onSelectHandler !== 'function') {
      throw new Error('onSelectHandler is not a function!');
    }
    if (onChangeCursor && typeof onChangeCursor !== 'function') {
      throw new Error('onChangeCursor is not a function!');
    }
    if (onCancelHandler && typeof onCancelHandler !== 'function') {
      throw new Error('onCancelHandler is not a function!');
    }
    this._cardset = sprite;
    this._cursorIndex = 0;
    this._selectedIndexs = [];
    this._selectNumber = selectNumber;
    this._onSelectHandler = onSelectHandler;
    this._onChangeCursor = onChangeCursor;
    this._onCancelHandler = onCancelHandler;
    this.updateOnChangeCursor();
    this.updateHoverSprites();
  }

  staticMode() {
    this._cardset.changeStatus(CardsetSpriteStaticModeState);
  }

  selectMode() {
    return false;
  }

  updateOnChangeCursor() {
    if (this._onChangeCursor) {
      const cardset = this._cardset;
      cardset.addCommand(this._onChangeCursor, this._cursorIndex);
    }
  }

  updateHoverSprites() {
    const cardset = this._cardset;
    const sprites = cardset.getSprites();
    const spriteToAdd = cardset.getSprites(this._cursorIndex).shift();
    cardset.commandAddChildToEnd(spriteToAdd);
    sprites.forEach((sprite, index) => {
      if (spriteToAdd === sprite) {
        return this.hoverSprite(sprite);
      } 
      this.unhoverSprite(sprite);
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

  updateStatus() {
    const cardset = this._cardset;
    const keys = ['right', 'left'];
    if (cardset.isAvailable()) {
      this.updateCursor();
      if (this.isSelectable()) {
        if (this._onCancelHandler && Input.isTriggered('cancel')) {
          cardset.addCommand(this._onCancelHandler);
          return cardset.commandStaticMode();
        }
        if (this.selectIsFull()) {
          cardset.addCommand(this._onSelectHandler, this._selectedIndexs);
          return cardset.commandStaticMode();
        }
        if (Input.isTriggered('ok')) this.selectSprite();
      }
    }
  }

  updateCursor() {
    if (this.isRepeatedOrLongPressedRight()) {
      this.moveCursorRight();
    } else if (this.isRepeatedOrLongPressedLeft()) {
      this.moveCursorLeft();
    }
    if (this.isRepeatedOrLongPressedRight() || this.isRepeatedOrLongPressedLeft()) {
      this.updateOnChangeCursor();
      this.updateHoverSprites();
    }
  }

  isRepeatedOrLongPressedRight() {
    return Input.isRepeated('right') || Input.isLongPressed('right');
  }

  isRepeatedOrLongPressedLeft() {
    return Input.isRepeated('left') || Input.isLongPressed('left');
  }

  moveCursorRight(times = 1) {
    const sprites = this._cardset.getSprites();
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
    const sprites = this._cardset.getSprites();
    const indexsAmount = sprites.length - 1;
    if (this._cursorIndex > minIndex) {
      const nextIndex = this._cursorIndex - times;
      this._cursorIndex = nextIndex < minIndex ? minIndex : nextIndex;
    } else {
      this._cursorIndex = indexsAmount;
    }
  }

  isSelectable() {
    return this._selectNumber !== 0;
  }

  selectSprite() {
    const cursorIndex = this._cursorIndex;
    const sprite = this._cardset.getSprites(cursorIndex).shift();
    if (sprite && sprite.isDisabled()) return;
    if (this._selectedIndexs.includes(cursorIndex)) {
      this.removeSelectedIndex(cursorIndex);
    } else {
      this.addSelectedIndex(cursorIndex);
    }
    if (this.selectIsFull() === false) this.updateSelectSprites();
  }

  removeSelectedIndex(index) {
    this._selectedIndexs = this._selectedIndexs.filter(spriteIndex => spriteIndex !== index);
  }

  addSelectedIndex(index) {
    this._selectedIndexs.push(index);
  }

  updateSelectSprites() {
    const sprites = this._cardset.getSprites();
    sprites.forEach((sprite, index) => {
      if (this._selectedIndexs.includes(index)) {
        sprite.select();
      } else {
        sprite.unselect();
      }
    });
  }

  selectIsFull() {
    const cardset = this._cardset;
    const allowedAmount = cardset.getEnabledSpritesAmount();
    const selectedAmount = this._selectedIndexs.length;
    let limit = false;
    let full = false;
    if (this._selectNumber > 0) {
      limit = selectedAmount >= this._selectNumber;
    }
    if (selectedAmount > 0) {
      full = selectedAmount === allowedAmount;
    }
    return limit || full;
  }
}