class LoadPhase extends Phase {
  _textWindow = {};
  _askWindow = {};
  _locationWindow = {};
  _cardNameWindow = {};
  _cardDescriptionWindow = {};
  _cardPropsWindow = {};
  _playerHand = {};
  _powerfield = {};

  createTextWindow(text) {
    this._textWindow = TextWindow.createWindowFullSize(0, 0, [text]);
    this._textWindow.alignCenterMiddle();
    this._textWindow.alignTextCenter();
    this.attachChildLast(this._textWindow);
  }

  createAskWindow(text, yesHandler, noHanlder) {
    const commandYes = CommandWindow.createCommand('Yes', 'YES', yesHandler);
    const commandNo = CommandWindow.createCommand('No', 'NO', noHanlder);
    this._askWindow = CommandWindow.create(0, 0, [text], [commandYes, commandNo]);
    this._askWindow.alignBottom();
    this.addWindow(this._askWindow);
  }

  createPlayerHandset(cards) {
    this.createPlayerHand(cards);
    this.createLocationWindow();
    this.createCardNameWindow();
    this.createCardDescriptionWindow();
    this.createCardPropsWindow();
  }

  createPlayerHand(cards) {
    const x = ScreenHelper.getCenterPosition(CardsetSprite.contentOriginalWidth());
    const y = ScreenHelper.getMiddlePosition(CardsetSprite.contentOriginalHeight());
    this._playerHand = CardsetSprite.create(x, y);
    this._playerHand.show();
    const sprites = this._playerHand.listCards(cards);
    this._playerHand.startClosedCards(sprites);
    this.attachChild(this._playerHand);
  }

  createLocationWindow() {
    this._locationWindow = TextWindow.createWindowMiddleSize(0, 0);
    this._locationWindow.alignStartTop();
    this._locationWindow.alignAboveOf(this._playerHand);
    this._locationWindow.y -= 160;
    this._locationWindow.alignTextCenter();
    this.attachChildLast(this._locationWindow);
  }

  createCardNameWindow() {
    this._cardNameWindow = TextWindow.createWindowMiddleSize(0, 0);
    this._cardNameWindow.alignEndTop();
    this._cardNameWindow.alignAboveOf(this._playerHand);
    this._cardNameWindow.y -= 160;
    this.attachChildLast(this._cardNameWindow);
  }

  createCardDescriptionWindow() {
    this._cardDescriptionWindow = TextWindow.createWindowMiddleSize(0, 0);
    this._cardDescriptionWindow.alignStartBottom();
    this._cardDescriptionWindow.alignBelowOf(this._playerHand);
    this._cardDescriptionWindow.y += 100;
    this.attachChildLast(this._cardDescriptionWindow);
  }

  createCardPropsWindow() {
    this._cardPropsWindow = TextWindow.createWindowMiddleSize(0, 0);
    this._cardPropsWindow.alignEndBottom();
    this._cardPropsWindow.alignBelowOf(this._playerHand);
    this._cardPropsWindow.y += 100;
    this.attachChildLast(this._cardPropsWindow);
  }

  openBeginLoadPhaseWindow() {
    this.addAction(this.commandOpenTextWindow);
  }

  commandOpenTextWindow() {
    this._textWindow.open();
  }

  openAskWindow() {
    this.addAction(this.commandOpenAskWindow);
  }

  commandOpenAskWindow() {
    this._askWindow.open();
  }

  closeBeginLoadPhaseWindow() {
    this.addAction(this.commandCloseTextWindow);
  }

  commandCloseTextWindow() {
    this._textWindow.close();
  }

  closeAskWindow() {
    this.addAction(this.commandCloseAskWindow);
  }

  commandCloseAskWindow() {
    this._askWindow.close();
  }

  isBusy() {
    const children = [
      this._textWindow,
      this._askWindow,
      this._locationWindow,
      this._cardNameWindow,
      this._cardDescriptionWindow,
      this._cardPropsWindow,
      this._playerHand
    ];
    return super.isBusy() || children.some(obj => (obj.isBusy ? obj.isBusy() : false));
  }

  getTextWindow() {
    return this._textWindow;
  }

  openPlayerHand(onSelectHandler, onChangeCursor, onCancelHandler) {
    this.addActions([
      this.commandOpenPlayerHand,
      [this.commandPlayerHandSelectMode, onSelectHandler, onChangeCursor, onCancelHandler]
    ]);
    this.addActions([
      this.commandSetTextLocationWindow,
      this.commandOpenLocationWindow,
      this.commandOpenCardNameWindow,
      this.commandOpenCardDescriptionWindow,
      this.commandOpenCardPropsWindow,
      this.commandOpenPlayerBoardWindow,
    ]);
  }

  commandSetTextLocationWindow() {
    this._locationWindow.refreshContent(['Player Hand']);
  }

  commandOpenLocationWindow() {
    this._locationWindow.open();
  }

  commandOpenCardNameWindow() {
    this._cardNameWindow.open();
  }

  commandOpenCardDescriptionWindow() {
    this._cardDescriptionWindow.open();
  }

  commandOpenCardPropsWindow() {
    this._cardPropsWindow.open();
  }

  commandOpenPlayerHand() {
    this._playerHand.openCards();
  }

  commandPlayerHandSelectMode(onSelectHandler, onChangeCursor, onCancelHandler) {
    const selectNumber = 1;
    this._playerHand.selectMode(selectNumber, onSelectHandler, onChangeCursor, onCancelHandler);
  }

  commandSetTextCardNameWindow(text) {
    this._cardNameWindow.refreshContent(text);
  }

  commandSetTextCardDescriptionWindow(text) {
    this._cardDescriptionWindow.refreshContent(text);
  }

  commandSetTextCardPropsWindow(text) {
    this._cardPropsWindow.refreshContent(text);
  }

  commandGetSprites(index) {
    return this._playerHand.getSprites(index);
  }

  commandSelectMovement(sprites) {
    const cardset = this._playerHand;
    cardset.addChildToEnd(sprites);
    cardset.zoomAllCards(sprites);
    cardset.zoomOutAllCards(sprites);
  }

  selectPowerCard(sprites) {
    this.addActions([
      [this.commandSelectMovement, sprites],
    ]);
  }

  closePlayerHand() {
    this.addActions([
      this.commandCloseLocationWindow,
      this.commandCloseCardNameWindow,
      this.commandCloseCardDescriptionWindow,
      this.commandCloseCardPropsWindow,
      this.commandClosePlayerBoardWindow,
    ]);
    this.addActions([
      this.commandClosePlayerHand
    ]);
  }

  commandCloseLocationWindow() {
    this._locationWindow.close();
  }

  commandCloseCardNameWindow() {
    this._cardNameWindow.close();
  }

  commandCloseCardDescriptionWindow() {
    this._cardDescriptionWindow.close();
  }

  commandCloseCardPropsWindow() {
    this._cardPropsWindow.close();
  }

  commandClosePlayerHand() {
    this._playerHand.closeCards();
  }

  activatePowerCard(cards) {
    this.addAction(this.commandActivatePowerCard, cards);
  }

  commandActivatePowerCard(cards) {
    this.createPowerfield(cards);
    this._powerfield.openCards();
  }

  createPowerfield(cards) {
    const x = ScreenHelper.getCenterPosition(CardsetSprite.contentOriginalWidth());
    const y = ScreenHelper.getMiddlePosition(CardsetSprite.contentOriginalHeight());
    if (this._powerfield instanceof CardsetSprite) this.removeChild(this._powerfield);
    this._powerfield = CardsetSprite.create(x, y);
    this._powerfield.show();
    const xCard = CardsetSprite.contentOriginalWidth() - CardSprite.contentOriginalWidth();
    const sprites = this._powerfield.setCards(cards, xCard);
    this._powerfield.startClosedCards(sprites);
    this.addChild(this._powerfield);
  }

  leavePowerCard() {
    this.addAction(this.commandLeavePowerCard);
  }

  commandLeavePowerCard() {
    this._powerfield.closeCards();
  }
}
