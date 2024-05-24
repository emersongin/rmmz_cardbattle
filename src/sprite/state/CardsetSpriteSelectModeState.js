class CardsetSpriteSelectModeState {
  _cardset;
  _cursorIndex;
  _selectedIndexs;
  _selectNumber;
  _confirmWindow;
  _selectCardsCallback;

  constructor(sprite, number = 0, selectCardsCallback, message = 'confirm the selection?') {
    if (!(sprite instanceof CardsetSprite)) {
      throw new Error('sprite is not a CardsetSprite instance!');
    }
    if (typeof selectCardsCallback !== 'function') {
      throw new Error('selectCardsCallback is not a function!');
    }
    this._cardset = sprite;
    this._cursorIndex = 0;
    this._selectedIndexs = [];
    this._selectNumber = number;
    this._selectCardsCallback = selectCardsCallback;
    this.createConfirmWindow(message);
    this.updateHoverSprites();
  }

  createConfirmWindow(message) {
    const confirmHandler = () => {
      this._selectCardsCallback(this._selectedIndexs);
    };
    const returnHandler = () => {
      this.returnToSelection();
    };
    const commandYes = CommandWindow.createCommand('Yes', 'YES', confirmHandler);
    const commandNo = CommandWindow.createCommand('No', 'NO', returnHandler);
    const text = [message];
    this._confirmWindow = CommandWindow.create(0, 0, text, [commandYes, commandNo]);
    this._confirmWindow.alignMiddle();
    this._cardset.addChild(this._confirmWindow);
  }

  returnToSelection() {
    if (this.selectIsFull()) {
      this._selectedIndexs.pop();
    }
    this.updateSelectSprites();
    this.updateHoverSprites();
    this.closeConfirmWindow();
  }

  updateStatus() {
    const cardset = this._cardset;
    const keys = ['right', 'left'];
    if (cardset.isAvailable() && !this.isWindowBusy()) {
      this.updateCursor();
      if (Input.isAnyKeyActiveIn(keys)) this.updateHoverSprites();
      if (this.isSelectable()) {
        if (Input.isTriggered('ok')) this.selectSprite();
        if (Input.isTriggered('cancel') || this.selectIsFull()) {
          cardset.iluminateSelectedSprites(this._selectedIndexs);
          if (this.isJustOneSelectable()) {
            cardset.addCommand(this._selectCardsCallback, this._selectedIndexs);
            return;
          }
          this.openConfirmWindow();
        }
      }
    }
  }

  isWindowBusy() {
    return this._confirmWindow.isOpen();
  }

  isSelectable() {
    return this._selectNumber !== 0;
  }

  isJustOneSelectable() {
    return this._selectNumber === 1;
  }

  selectIsFull() {
    const cardset = this._cardset;
    const allowedAmount = cardset.getEnabledSpritesAmount();
    const selectedAmount = this._selectedIndexs.length;
    let limit = false;
    if (this._selectNumber > 0) {
      limit = selectedAmount >= this._selectNumber;
    }
    const full = selectedAmount === allowedAmount;
    return limit || full;
  }

  openConfirmWindow() {
    this._confirmWindow.open();
  }

  closeConfirmWindow() {
    this._confirmWindow.close();
  }

  updateCursor() {
    if (Input.isRepeated('right') || Input.isLongPressed('right')) {
      this.moveCursorRight();
    } else if (Input.isRepeated('left') || Input.isLongPressed('left')) {
      this.moveCursorLeft();
    }
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

  updateHoverSprites() {
    const cardset = this._cardset;
    const sprites = this._cardset.getSprites();
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
    const cursorIndex = this._cursorIndex;
    if (this._selectedIndexs.includes(cursorIndex)) {
      this.removeSelectedIndex(cursorIndex);
    } else {
      this.addSelectedIndex(cursorIndex);
    }
    this.updateSelectSprites();
  }

  addSelectedIndex(index) {
    this._selectedIndexs.push(index);
  }

  updateSelectSprites() {
    const sprites = this._cardset.getSprites();
    sprites.forEach((sprite, index) => {
      sprite.uniluminate();
      if (this._selectedIndexs.includes(index)) {
        sprite.select();
      } else {
        sprite.unselect();
      }
    });
  }

  removeSelectedIndex(index) {
    this._selectedIndexs = this._selectedIndexs.filter(spriteIndex => spriteIndex !== index);
  }
}