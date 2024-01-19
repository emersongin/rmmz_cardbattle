class CardsetSprite extends ActionSprite {
  initialize() { 
    super.initialize();
    this._cardSprites = [];
    this._selectMode = false;
    this._changedMode = false;
    this._selectedCards = [];
    this._cursorIndex = 0;
    this._active = false;
    this.setup();
    this.test();
  }

  setup() {
    this.visible = false;
    this.setWidthLimit();
  }

  test() {
    this.bitmap = new Bitmap(this.setWidthLimit(), this.setHeightLimit());
    this.bitmap.fillAll('#555');
  }

  setWidthLimit() {
    this._lengthLimit = 96 * 6;
  }

  setHeightLimit() {
    this._heightLimit = 128;
  }

  setCards(cards) {
    this.clearContents();
    if (Array.isArray(cards) && cards.length) {
      const cardsAmount = cards.length + this.countCardSprites();
      cards.forEach((card, index) => this.addCard(card, index, cardsAmount));
    }
  }

  clearContents() {
    this._cardSprites.forEach(card => card.sprite.destroy());
    this._cardSprites = [];
  }

  addCard(card, index, cardsAmount) {
    const cardSprite = this.createCardSprite(card);
    this.setInitialPosition(cardSprite, index, cardsAmount);
    this.addChild(cardSprite);
    this._cardSprites.push(this.createCardObject(cardSprite));
  }

  addCards(cards) {
    if (Array.isArray(cards) && cards.length) {
      const cardsAmount = cards.length + this.countCardSprites();
      cards.forEach((card, index) => this.addCard(card, index, cardsAmount));
    }
  }

  createCardSprite(card) {
    const cardSprite = new CardSprite();
    cardSprite.setCard(card);
    return cardSprite;
  }

  setInitialPosition(cardSprite, index, cardsAmount) {
    const widthCard = cardSprite.cardOriginalWidth();
    cardSprite.setXPosition(this.xCardPosition(widthCard, index, cardsAmount));
    cardSprite.setYPosition(0);
    return cardSprite;
  }

  countCardSprites() {
    return this._cardSprites.length;
  }

  xCardPosition(widthCard, index, cardsAmount) {
    const lengthLimit = this._lengthLimit;
    return (this.xCardMargin(widthCard, cardsAmount, lengthLimit) * index);
  }

  xCardMargin(widthCard, cardsAmount, lengthLimit) {
      const padding = 1;
      const space = (lengthLimit - (padding * cardsAmount)) / (cardsAmount || 1);
      return parseInt((space < widthCard ? space : widthCard) + padding) || padding;
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

  showCards(cardIndexs) {
    this.addAction(this.commandShowCards, cardIndexs);
  }
  
  commandShowCards(cardSprites = []) {
    this._cardSprites = this._cardSprites.map((card, index) => {
      const cardSprite = cardSprites.find(sprite => sprite === card.sprite);
      if (cardSprite || !cardSprites.length) {
        card.sprite.show();
        card.state = CardSpriteStates.ENABLED;
      }
      return card;
    });
  }

  showCardsAndStartMoving(cardIndexs, timeInterval) {
    this.addAction(this.commandShowCardsAndStartMoving, cardIndexs, timeInterval);
  }

  commandShowCardsAndStartMoving(cardSprites = [], timeInterval = 0) {
    this._cardSprites = this._cardSprites.map((card, index) => {
      const cardSprite = cardSprites.find(sprite => sprite === card.sprite);
      if (cardSprite || !cardSprites.length) {
        card.sprite.hide();
        card.state = CardSpriteStates.ENABLED;
        setTimeout(() => {
          this.moveCardToStartPosition(card.sprite);
          card.sprite.show();
        }, (index * (timeInterval * 1000)));
      }
      return card;
    });

    this._cardSprites = this._cardSprites.map((card, index) => {
      const cardSprite = cardSprites.find(sprite => sprite === card.sprite);
      if (cardSprite) {
        card.sprite.show();
        card.state = CardSpriteStates.ENABLED;
      }
      return card;
    });
  }
  
  hiddenCards(cardIndexs) {
    this._cardSprites = this._cardSprites.map((card, index) => {
      if (cardIndexs && cardIndexs.includes(index) || !cardIndexs) {
        card.sprite.hide();
      }
      return card;
    });
  }

  moveCardToStartPosition(cardSprite) {
    const cardsetYPosition = 0;
    const origin = {
      x: Graphics.boxWidth,
      y: cardsetYPosition
    };
    const destination = {
      x: cardSprite.x,
      y: cardSprite.y
    };
    this.startCardMoving(cardSprite, origin, destination);
  }

  startCardMoving(cardSprite, origin, destination) {
    cardSprite.toMove(origin, destination);
  }

  startCloseCards(cardIndexs, timeInterval) {
    this.addAction(this.commandStartCloseCards, cardIndexs, timeInterval);
  }

  commandStartCloseCards(cardSprites = [], timeInterval = 0) {
    cardSprites.forEach((cardSprite, index) => {
      setTimeout(() => {
        if (this.isCardState(cardSprite, CardSpriteStates.ENABLED)) {
          this.startCloseCard(cardSprite);
        }
      }, (index * (timeInterval * 1000)));
    });
  }

  startCloseCard(cardSprite) {
    cardSprite.close();
  }

  startOpenCards(cardIndexs, timeInterval) {
    this.addAction(this.commandStartOpenCards, cardIndexs, timeInterval);
  }

  commandStartOpenCards(cardSprites = [], timeInterval = 0) {
    cardSprites.forEach((cardSprite, index) => {
      setTimeout(() => {
        if (this.isCardState(cardSprite, CardSpriteStates.ENABLED)) {
          this.startOpenCard(cardSprite);
        }
      }, (index * (timeInterval * 1000)));
    });
  }

  startOpenCard(cardSprite) {
    cardSprite.open();
  }

  getWaitingCardSprites() {
    const cadSprites = [];
    this._cardSprites.forEach((card, index) => {
      if (card.state === CardSpriteStates.WAITING) {
        cadSprites.push(card.sprite);
      }
    });
    return cadSprites;
  }

  isNotBusy() {
    return !this.isBusy();
  }
  
  isBusy() {
    return this._selectMode || this.isBusyCards();
  }
  
  isBusyCards() {
    return this._cardSprites.some(card => card.sprite.isBusy());
  }

  isNotBusyCards() {
    return !this.isBusyCards();
  }
  
  update() {
    if (this.isDisabled()) return;
    if (this.hasActions() && this.isNotBusy()) this.executeAction();
    if (this.isCardSpritesMoving() && this.isHidden()) this.show();
    if (this.isVisible()) {
      console.log(this._selectMode, this.isNotBusyCards());
      if (this._selectMode && this.isNotBusyCards()) {
        this.updateSelectMode();
      }
    }
    super.update();
  }

  isDisabled() {
    return !this._active;
  }

  isCardSpritesMoving() {
    return this._cardSprites.some(card => card.sprite.isMoving());
  }

  isVisible() {
    return this.visible;
  }

  isHidden() {
    return !this.isVisible();
  }

  updateSelectMode() {
    this.updateCursor();
    if (Input.isAnyKeyActive() || this.isModeHasChanged()) this.updateSpriteCards();
  }

  isModeHasChanged() {
    if (this._changedMode) {
      this._changedMode = false;
      return true;
    }
    return this._changedMode;
  }

  updateCursor() {
    const timesWhenLongPressed = 4;
    if (Input.isRepeated('right')) {
      this.moveCursorRight();
      if (Input.isLongPressed('right')) this.moveCursorRight(timesWhenLongPressed);
    } else if (Input.isRepeated('left')) {
      this.moveCursorLeft();
      if (Input.isLongPressed('left')) this.moveCursorLeft(timesWhenLongPressed);
    }
  }

  moveCursorRight(times = 1) {
    const indexsAmount = this._cardSprites.length - 1;
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
    this._cardSprites.forEach((card, index) => {
      const sprite = card.sprite;
      const indexsAmount = this._cardSprites.length - 1;
      if (index === this._cursorIndex) {
        this.highlightedCard(sprite);
        this.removeChild(sprite);
        this.addChildAt(sprite, indexsAmount);
      } else {
        this.clearHighlightedCard(sprite);
        this.removeChild(sprite);
        const fixLastCardindex = (index === indexsAmount ? indexsAmount - 1 : index);
        this.addChildAt(sprite, fixLastCardindex);
      }
    });
  }

  highlightedCard(cardSprite) {
    const cardsetYPosition = 0;
    const origin = {
      x: cardSprite.x,
      y: cardsetYPosition
    };
    const destination = {
      x: cardSprite.x,
      y: cardsetYPosition - 10
    };
    this.startCardMoving(cardSprite, origin, destination);
    cardSprite.highlight();
  }

  clearHighlightedCard(cardSprite) {
    const cardsetYPosition = 0;
    const origin = {
      x: cardSprite.x,
      y: cardSprite.y
    };
    const destination = {
      x: cardSprite.x,
      y: cardsetYPosition
    };
    cardSprite.unhighlight();
    this.startCardMoving(cardSprite, origin, destination);
  }

  activeSelectMode() {
    this.addAction(this.commandActiveSelectMode);
  }

  commandActiveSelectMode() {
    if (this.someEnabledCardSprite()) {
      this._selectMode = true;
      this._changedMode = true;
      this._cursorIndex = 0;
    }
  }

  someEnabledCardSprite() {
    return this._cardSprites.some(card => card.state === CardSpriteStates.ENABLED);
  }

  isCardsStarted() {
    return this._cardsStarted;
  }

  activate() {
    this._active = true;
  }

  showCardCloseds(cardIndexs) {
    this.addAction(this.commandShowCardCloseds, cardIndexs);
  }

  commandShowCardCloseds(cardSprites = []) {
    this._cardSprites = this._cardSprites.map((card, index) => {
      const cardSprite = cardSprites.find(sprite => sprite === card.sprite);
      if (cardSprite || !cardSprites.length) {
        card.state = CardSpriteStates.ENABLED;
        const sprite = card.sprite;
        const closedXPosition = sprite.x + (sprite.cardOriginalWidth() / 2);
        const closedWidth = 0;
        sprite._x = closedXPosition;
        sprite.x = closedXPosition;
        sprite.width = closedWidth;
        sprite.closed();
        sprite.show();
      }
      return card;
    });
  }

  startFlashCards(cardIndexs, timeInterval, color, duration) {
    this.addAction(this.commandStartFlashCards, cardIndexs, timeInterval, color, duration);
  }

  commandStartFlashCards(cardSprites = [], timeInterval = 0, color, duration) {
    cardSprites.forEach((cardSprite, index) => {
      setTimeout(() => {
        if (this.isCardState(cardSprite, CardSpriteStates.ENABLED)) {
          this.startFlashCard(cardSprite, color, duration);
        }
      }, (index * (timeInterval * 1000)));
    });
  }

  startFlashCard(cardSprite, color, duration) {
    cardSprite.flash(color, duration);
  }

  startDamageAnimation(cardIndexs, timeInterval) {
    this.addAction(this.commandStartDamageAnimationCard, cardIndexs, timeInterval);
  }

  commandStartDamageAnimationCard(cardSprites = [], timeInterval = 0) {
    cardSprites.forEach((sprite, index) => {
      setTimeout(() => {
        if (this.isCardState(sprite, CardSpriteStates.ENABLED)) {
          sprite.animationDamage();
        }
      }, (index * (timeInterval * 1000)));
    });
  }

  isCardState(cardSprite, state) {
    const card = this._cardSprites.find(card => card.sprite === cardSprite);
    return card ? card.state === state : false;

  }

}