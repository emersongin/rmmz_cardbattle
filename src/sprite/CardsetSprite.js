class CardsetSprite extends Sprite {
  initialize() { 
    super.initialize();
    this._cardSprites = [];
    this.visible = true;
    this.bitmap = new Bitmap(576, 128);
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
    this._cardSprites.push({
      state: CardSpriteStates.ADD,
      sprite: cardSprite
    });
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

  show() {
    this.visible = true;
  }

  startShowCardsMoving(cardIndexs = []) {
    this.hiddenCards(cardIndexs);
    cardIndexs.forEach((cardIndex, index) => {
      setTimeout(() => {
        this.startShowCardMoving(cardIndex);
      }, (index * 300));
    });
  }
  
  showCards(cardIndexs = false) {
    this._cardSprites = this._cardSprites.map((card, index) => {
      if (cardIndexs && cardIndexs.includes(index) || !cardIndexs) {
        card.sprite.show();
        card.state = CardSpriteStates.SHOW;
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
    cardSprite.startMoving(origin, destination);
    cardSprite.show();
    this._cardSprites[index].state = CardSpriteStates.SHOW;
  }

  hiddenCards(cardIndexs = false) {
    this._cardSprites = this._cardSprites.map((card, index) => {
      if (cardIndexs && cardIndexs.includes(index) || !cardIndexs) {
        card.sprite.hidden();
        card.state = CardSpriteStates.HIDDEN;
      }
      return card;
    });
  }

  getIndexAddedCardSprites() {
    const indexs = [];
    this._cardSprites.forEach((card, index) => {
      if (card.state === CardSpriteStates.ADD) {
        indexs.push(index);
      }
    });
    return indexs;
  }
}