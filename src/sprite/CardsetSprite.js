class CardsetSprite extends Sprite {
  initialize() { 
    super.initialize();
    this._cardSprites = [];
    this._selectMode = false;
    this._selectedCards = [];
    this._cursorIndex = 0;
    this.test();
  }

  test() {
    this.bitmap = new Bitmap(96 * 6, 128);
    this.bitmap.fillAll('#555');
  }
  setCards(cards) {
    this.clearContents();
    if (Array.isArray(cards) && cards.length) {
      cards.forEach(card => this.addCard(card));
    }
  }

  clearContents() {
    this._cardSprites.forEach(card => card.sprite.destroy());
    this._cardSprites = [];
  }

  addCard(card) {
    const cardSprite = this.createCardSprite(card);
    this.setInitialPosition(cardSprite);
    this.addChild(cardSprite);
    this._cardSprites.push(this.createCardObject(cardSprite));
  }

  addCards(cards) {
    if (Array.isArray(cards) && cards.length) {
      cards.forEach(card => this.addCard(card));
    }
  }

  createCardSprite(card) {
    const cardSprite = new CardSprite();
    cardSprite.setCard(card);
    return cardSprite;
  }

  setInitialPosition(cardSprite) {
    const size = this.getSize();
    cardSprite.setXPosition(this.xCardPosition(size, cardSprite.width));
    cardSprite.setYPosition(0);
    return cardSprite;
  }

  getSize() {
    return this._cardSprites.length;
  }

  xCardPosition(size, width) {
    return size + (width * size);
  }

  createCardObject(cardSprite) {
    return {
      state: CardSpriteStates.WAITING,
      sprite: cardSprite
    };
  }

  show() {
    this.visible = true;
  }
  
  showCards(cardIndexs = false) {
    this._cardSprites = this._cardSprites.map((card, index) => {
      if (cardIndexs && cardIndexs.includes(index) || !cardIndexs) {
        card.sprite.show();
        card.state = CardSpriteStates.ENABLED;
      }
      return card;
    });
  }

  startShowCardsMoving(cardIndexs = []) {
    this.hiddenCards(cardIndexs);
    cardIndexs.forEach((cardIndex, index) => {
      setTimeout(() => {
        this.startShowCardMoving(cardIndex);
      }, (index * 300));
    });
  }
  
  hiddenCards(cardIndexs = false) {
    this._cardSprites = this._cardSprites.map((card, index) => {
      if (cardIndexs && cardIndexs.includes(index) || !cardIndexs) {
        card.sprite.hide();
      }
      return card;
    });
  }

  startShowCardMoving(index) {
    const cardSprite = this._cardSprites[index].sprite;
    const origin = {
      x: Graphics.boxWidth,
      y: this.y
    };
    const destination = {
      x: cardSprite.x,
      y: cardSprite.y
    };
    cardSprite.toMove(origin, destination);
    this._cardSprites[index].state = CardSpriteStates.ENABLED;
  }

  startCloseCards(cardIndexs = []) {
    cardIndexs.forEach((cardIndex, index) => {
      setTimeout(() => {
        this.startCloseCard(cardIndex);
      }, (index * 300));
    });
  }

  startCloseCard(index) {
    const cardSprite = this._cardSprites[index].sprite;
    const cardState = this._cardSprites[index].state;
    if (cardState === CardSpriteStates.ENABLED) cardSprite.close();
  }

  startOpenCards(cardIndexs = []) {
    cardIndexs.forEach((cardIndex, index) => {
      setTimeout(() => {
        this.startOpenCard(cardIndex);
      }, (index * 300));
    });
  }

  startOpenCard(index) {
    const cardSprite = this._cardSprites[index].sprite;
    const cardState = this._cardSprites[index].state;
    if (cardState === CardSpriteStates.ENABLED) cardSprite.open();
  }

  getWaitingCardSpriteIndexs() {
    const indexs = [];
    this._cardSprites.forEach((card, index) => {
      if (card.state === CardSpriteStates.WAITING) {
        indexs.push(index);
      }
    });
    return indexs;
  }

  isBusy() {
    return this._selectMode || this.isCardSpritesStopped();
  }

  isCardSpritesStopped() {
    return this._cardSprites.every(card => card.sprite.isStopped());
  }

  update() {
    if (this._selectMode && this.isCardSpritesStopped()) {
      this.updateSelectMode();
    }
    super.update();
    console.log(this._cursorIndex);
  }

  updateSelectMode() {
    this.updateCursor();
  }

  updateCursor() {
    if (Input.isTriggered('right')) {
      this.moveCursorRight();
    } else if (Input.isTriggered('left')) {
      this.moveCursorLeft();
    }
  }

  moveCursorRight() {
    if (this._cursorIndex < this._cardSprites.length - 1) {
      this._cursorIndex++;
    }
  }

  moveCursorLeft() {
    if (this._cursorIndex > 0) {
      this._cursorIndex--;
    }
  }

  activeSelectMode() {
    this._selectMode = true;
    this._cursorIndex = 0;
  }
}