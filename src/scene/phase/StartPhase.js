class StartPhase extends Phase {
  _titleWindow;
  _descriptionWindow;
  _cardDrawGameCardset;

  createTitleWindow(title) {
    this._titleWindow = TextWindow.createWindowFullSize(0, 0, title);
    this._titleWindow.alignCenterAboveMiddle();
    this._titleWindow.alignTextCenter();
    this.addWindow(this._titleWindow);
  }

  createDescriptionWindow(text) {
    this._descriptionWindow = TextWindow.createWindowFullSize(0, 0, text);
    this._descriptionWindow.alignCenterMiddle();
    this.addWindow(this._descriptionWindow);
  }

  createCardDrawGameCardset(cards) {
    this._cardDrawGameCardset = CardsetSprite.create(0, 0);
    this._cardDrawGameCardset.centralize();
    const randomCards = this.shuffleCards(cards);
    const sprites = this._cardDrawGameCardset.setCards(randomCards, Graphics.boxWidth, Graphics.boxHeight);
    const xSprite1 = -(this._cardDrawGameCardset.x + CardSprite.contentOriginalWidth());
    const ySprite1 = -(this._cardDrawGameCardset.y + CardSprite.contentOriginalHeight());
    const position1 = CardSprite.createPosition(xSprite1, ySprite1, 0);
    const xSprite2 = (Graphics.boxWidth - this._cardDrawGameCardset.x);
    const ySprite2 = (Graphics.boxHeight - this._cardDrawGameCardset.y);
    const position2 = CardSprite.createPosition(xSprite2, ySprite2, 1);
    const positions = [position1, position2];
    this._cardDrawGameCardset.setAllCardsInPositions(sprites, positions);
    this._cardDrawGameCardset.setTurnToDownCards();
    this.addChild(this._cardDrawGameCardset);
  }

  showCards() {
    this.addAction(this.commandShowCards);
  }
  
  commandShowCards() {
    this._cardDrawGameCardset.commandShow();
    this._cardDrawGameCardset.showCards();
    return true;
  }

  moveAllCardsToCenter() {
    this.addAction(this.commandMoveAllCardsToCenter);
  }

  commandMoveAllCardsToCenter() {
    const center = this._cardDrawGameCardset.width / 2;
    const x = center - CardSprite.contentOriginalWidth();
    const position1 = CardSprite.createPosition(x, 0, 0);
    const position2 = CardSprite.createPosition(center, 0, 1);
    const positions = [position1, position2];
    const sprites = this._cardDrawGameCardset.getSprites();
    this._cardDrawGameCardset.moveAllCardsToPositions(sprites, positions);
  }







  shuffleCards(cards) {
    const newCards = cards.slice();
    for (let i = newCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
    }
    return newCards;
  }

  openTitleWindow() {
    this.addAction(this.commandOpenTitleWindow);
  }

  commandOpenTitleWindow() {
    this._titleWindow.open();
    return true;
  }

  closeTitleWindow() {
    this.addAction(this.commandCloseTitleWindow);
  }

  commandCloseTitleWindow() {
    this._titleWindow.close();
    return true;
  } 

  openDescriptionWindow() {
    this.addAction(this.commandOpenDescriptionWindow);
  }

  commandOpenDescriptionWindow() {
    this._descriptionWindow.open();
    return true;
  }

  closeDescriptionWindow() {
    this.addAction(this.commandCloseDescriptionWindow);
  }

  commandCloseDescriptionWindow() {
    this._descriptionWindow.close();
    return true;
  }

  stepStartPhase() {
    this.changeStep('START_PHASE');
  }

  stepCardDrawGame() {
    this.changeStep('CARD_DRAW_GAME');
  }

  isStepStartPhase() {
    return this.getStep() === 'START_PHASE';
  }

  isStepCardDrawGame() {
    return this.getStep() === 'CARD_DRAW_GAME';
  }

  isBusy() {
    return super.isBusy() || 
      this._titleWindow.isBusy() || 
      this._descriptionWindow.isBusy();
  }
}