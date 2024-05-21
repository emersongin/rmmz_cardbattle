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
    this._cardDrawGameCardset.setCards(randomCards, x, y);
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