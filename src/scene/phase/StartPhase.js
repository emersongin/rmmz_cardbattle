class StartPhase extends Phase {
  _titleWindow;
  _descriptionWindow;
  _cardDrawGameCardset;

  createTitleWindow(title) {
    this._titleWindow = TextWindow.createWindowFullSize(0, 0, title);
    this._titleWindow.alignCenterAboveMiddle();
    this._titleWindow.alignTextCenter();
  }

  createDescriptionWindow(text) {
    this._descriptionWindow = TextWindow.createWindowFullSize(0, 0, text);
    this._descriptionWindow.alignCenterMiddle();
  }

  createCardDrawGameCardset(cards) {
    this._cardDrawGameCardset = CardsetSprite.create(0, 0);
    this._cardDrawGameCardset.centralize();
    this._cardDrawGameCardset.commandShow();
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
    this._cardDrawGameCardset.setTurnToDownCards(sprites);
  }

  shuffleCards(cards) {
    const newCards = cards.slice();
    for (let i = newCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
    }
    return newCards;
  }

  startCardDrawGame(selectHandler) {
    this.addAction(this.commandStartCardDrawGame, selectHandler);
  }

  commandStartCardDrawGame(selectHandler) {
    this.showCards();
    this.moveAllCardsToCenter();
    this.selectMode(selectHandler);
  }

  showCards() {
    this.addAction(this.commandShowCards);
  }
  
  commandShowCards() {
    this._cardDrawGameCardset.showCards();
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

  selectMode(selectHandler) {
    this.addAction(this.commandSelectMode, selectHandler);
  }

  commandSelectMode(selectHandler) {
    const selectNumber = 1;
    this._cardDrawGameCardset.selectMode(selectHandler, selectNumber);
  }

  openTitleWindow() {
    this.addAction(this.commandOpenTitleWindow);
  }

  commandOpenTitleWindow() {
    this._titleWindow.open();
  }

  closeTitleWindow() {
    this.addAction(this.commandCloseTitleWindow);
  }

  commandCloseTitleWindow() {
    this._titleWindow.close();
  } 

  openDescriptionWindow() {
    this.addAction(this.commandOpenDescriptionWindow);
  }

  commandOpenDescriptionWindow() {
    this._descriptionWindow.open();
  }

  closeDescriptionWindow() {
    this.addAction(this.commandCloseDescriptionWindow);
  }

  commandCloseDescriptionWindow() {
    this._descriptionWindow.close();
  }

  addChildren() {
    this.addAction(this.commandAddChildren);
  }

  commandAddChildren() {
    this.addWindows([
      this._titleWindow,
      this._descriptionWindow
    ]);
    this.addChild(this._cardDrawGameCardset);
  }

  stepStartPhase() {
    this.addAction(this.commandChangeStep, 'START_PHASE');
  }

  stepStartCardDrawGame() {
    this.addAction(this.commandChangeStep, 'START_CARD_DRAW_GAME');
  }

  stepEndCardDrawGame() {
    this.addAction(this.commandChangeStep, 'END_CARD_DRAW_GAME');
  }

  isStepStartPhase() {
    return this.getStep() === 'START_PHASE';
  }

  isStepStartCardDrawGame() {
    return this.getStep() === 'START_CARD_DRAW_GAME';
  }

  isStepEndCardDrawGame() {
    return this.getStep() === 'END_CARD_DRAW_GAME';
  }
  
  isBusy() {
    return super.isBusy() || 
      this._titleWindow.isBusy() || 
      this._descriptionWindow.isBusy() ||
      this._cardDrawGameCardset.isBusy();
  }

  endCardDrawGame(selectedIndex) {
    this.addAction(this.commandEndCardDrawGame, selectedIndex);
  }

  commandEndCardDrawGame(selectedIndex) {
    const sprite = this._cardDrawGameCardset.getSpriteByIndex(selectedIndex);
    this._cardDrawGameCardset.zoomAllCards(sprite);
    this._cardDrawGameCardset.zoomOutAllCards(sprite);
  }
}