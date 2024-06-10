class LoadPhase extends Phase {
  _textWindow = {};
  _askWindow = {};
  _locationWindow = {};
  _cardNameWindow = {};
  _cardDescriptionWindow = {};
  _cardPropsWindow = {};
  _playerHand = {};

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
    this._playerHand.setBackgroundColor('blue');
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

  stepBeginLoadPhase() {
    this.addAction(this.commandChangeStep, GameConst.BEGIN_LOAD_PHASE);
  }

  isStepBeginLoadPhase() {
    return this.isCurrentStep(GameConst.BEGIN_LOAD_PHASE);
  }

  stepPlayerLoadPhase() {
    this.addAction(this.commandChangeStep, GameConst.PLAYER_LOAD_PHASE);
  }

  isStepPlayerLoadPhase() {
    return this.isCurrentStep(GameConst.PLAYER_LOAD_PHASE);
  }

  stepChallengeLoadPhase() {
    this.addAction(this.commandChangeStep, GameConst.CHALLENGE_LOAD_PHASE);
  }

  isStepChallengeLoadPhase() {
    return this.isCurrentStep(GameConst.CHALLENGE_LOAD_PHASE);
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

  openPlayerHand(onChangeCursor) {
    this.addActions([
      this.commandOpenPlayerHand,
      [this.commandPlayerHandSelectMode, onChangeCursor]
    ]);
    this.addActions([
      this.commandSetTextLocationWindow,
      this.commandOpenLocationWindow,
      this.commandOpenCardNameWindow,
      this.commandOpenCardDescriptionWindow,
      this.commandOpenCardPropsWindow,
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

  commandPlayerHandSelectMode(onChangeCursor) {
    const selectNumber = 0;
    const selectHandler = (cards) => {};
    this._playerHand.selectMode(selectNumber, selectHandler, onChangeCursor);
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
}
