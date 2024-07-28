class HandStep extends Step {
  _config;
  _cardsetSprite;
  _locationWindow;
  _cardNameWindow;
  _cardDescriptionWindow;
  _cardPropsWindow;

  constructor(scene, phase, config, finish) {
    const phasesEnabled = [GameConst.LOAD_PHASE];
    if (!phasesEnabled.some(p => p === phase)) {
      throw new Error('Invalid phase for HandStep.');
    }
    super(scene, phase, finish);
    if (typeof config !== 'object') {
      throw new Error('config must be an object.');
    }
    if (config?.player !== GameConst.PLAYER && config?.player !== GameConst.CHALLENGED) {
      throw new Error('config.player must be GameConst.PLAYER or GameConst.CHALLENGED');
    }
    this.setConfig(config);
  }

  setConfig(config) {
    this._config = {
      player: config.player,
      selectCards: config?.selectCards || 1,
      checkElementSuficiencia: config?.checkElementSuficiencia || false,
      blockBattleCards: config?.blockBattleCards || false,
      blockPowerCards: config?.blockPowerCards || false,
      blockPowerCardsInLoadPhase: config?.blockPowerCardsInLoadPhase || false,
      blockPowerCardsInCompilePhase: config?.blockPowerCardsInCompilePhase || false,
    };
  }

  getPlayer() {
    return this._config.player;
  }

  start(manager) {
    this.createBoardWindow(manager);
    const cards = this.getPlayerHand(manager);
    const cardsetSprite = this.createCardsetSprite(cards);
    this.createAllWindows(cardsetSprite);
    this.openCardsetSprite(manager);
    this.openAllWindows();
  }

  createBoardWindow(manager) {
    const energies = Object.values(manager.getPlayerEnergies());
    const cardsInDeck = manager.getPlayerDeckLength();
    const cardsInHand = manager.getPlayerHandLength();
    const passed = manager.isPlayerPassed();
    this.createPlayerBoardWindow(energies, cardsInDeck, cardsInHand, passed);
  }

  getPlayerHand(manager) {
    const player = this.getPlayer();
    const config = this._config;
    if (player === GameConst.CHALLENGED) {
      return manager.getChallengedHand(config);
    }
    return manager.getPlayerHand(config);
  }

  createAllWindows(cardsetSprite) {
    const locationWindow = this.createLocationWindow(cardsetSprite);
    const cardNameWindow = this.createCardNameWindow(cardsetSprite);
    const cardDescriptionWindow = this.createCardDescriptionWindow(cardsetSprite);
    const cardPropsWindow = this.createCardPropsWindow(cardsetSprite);
    return { locationWindow, cardNameWindow, cardDescriptionWindow, cardPropsWindow };
  }

  createCardsetSprite(cards) {
    const x = ScreenHelper.getCenterPosition(CardsetSprite.contentOriginalWidth());
    const y = ScreenHelper.getMiddlePosition(CardsetSprite.contentOriginalHeight());
    const cardsetSprite = CardsetSprite.create(x, y);
    cardsetSprite.show();
    const sprites = cardsetSprite.listCards(cards);
    cardsetSprite.startClosedCards(sprites);
    const indexesDisabled = this.getIndexesDisabled(cards);
    const disableSprites = cardsetSprite.getSprites(indexesDisabled);
    cardsetSprite.disableCards(disableSprites);
    this.addAction(this.commandCreateCardsetSprite, cardsetSprite);
    return cardsetSprite;
  }

  getIndexesDisabled(cards) {
    return cards.map((card, index) => {
      if (card.disabled) return index;
    }).filter(index => index !== undefined);
  }

  commandCreateCardsetSprite(cardsetSprite) {
    this._cardsetSprite = cardsetSprite
    this.commandAddChild(cardsetSprite);
  }

  createLocationWindow(playerHand = this._cardsetSprite) {
    const locationWindow = TextWindow.createWindowMiddleSize(0, 0);
    locationWindow.alignStartTop();
    locationWindow.alignAboveOf(playerHand);
    locationWindow.y -= 160;
    locationWindow.alignTextCenter();
    this.addAction(this.commandCreateLocationWindow, locationWindow);
    return locationWindow;
  }

  commandCreateLocationWindow(locationWindow) {
    this._locationWindow = locationWindow;
    this.commandAddChild(locationWindow);
  }

  createCardNameWindow(playerHand = this._cardsetSprite) {
    const cardNameWindow = TextWindow.createWindowMiddleSize(0, 0);
    cardNameWindow.alignEndTop();
    cardNameWindow.alignAboveOf(playerHand);
    cardNameWindow.y -= 160;
    this.addAction(this.commandCreateCardNameWindow, cardNameWindow);
    return cardNameWindow;
  }
  
  commandCreateCardNameWindow(cardNameWindow) {
    this._cardNameWindow = cardNameWindow;
    this.commandAddChild(cardNameWindow);
  }

  createCardDescriptionWindow(playerHand = this._cardsetSprite) {
    const cardDescriptionWindow = TextWindow.createWindowMiddleSize(0, 0);
    cardDescriptionWindow.alignStartBottom();
    cardDescriptionWindow.alignBelowOf(playerHand);
    cardDescriptionWindow.y += 100;
    this.addAction(this.commandCreateCardDescriptionWindow, cardDescriptionWindow);
    return cardDescriptionWindow;
  }

  commandCreateCardDescriptionWindow(cardDescriptionWindow) {
    this._cardDescriptionWindow = cardDescriptionWindow;
    this.commandAddChild(cardDescriptionWindow);
  }

  createCardPropsWindow(playerHand = this._cardsetSprite) {
    const cardPropsWindow = TextWindow.createWindowMiddleSize(0, 0);
    cardPropsWindow.alignEndBottom();
    cardPropsWindow.alignBelowOf(playerHand);
    cardPropsWindow.y += 100;
    this.addAction(this.commandCreateCardPropsWindow, cardPropsWindow);
    return cardPropsWindow;
  }

  commandCreateCardPropsWindow(cardPropsWindow) {
    this._cardPropsWindow = cardPropsWindow;
    this.commandAddChild(cardPropsWindow);
  }

  createOnChangeCursor(manager) {
    return this.createOnChangeCursorLoadPhase(manager);
    // deve ser configuravel ao criar a classe
  }

  createOnChangeCursorLoadPhase(manager) {
    return index => {
      const card = manager.getCardPlayerHandByIndex(index);
      this.commandSetTextCardNameWindow(['card.name' + index]);
      this.commandSetTextCardDescriptionWindow(['card.description' + index]);
      this.commandSetTextCardPropsWindow(['card.props' + index]);
    };
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

  createOnSelectHandler(manager) {
    return this.createOnSelectHandlerLoadPhase();
    // deve ser configuravel ao criar a classe
  }

  createOnSelectHandlerLoadPhase() {
    return cardIndexs => {
      const sprite = this.commandGetHandSprites(cardIndexs).shift();
      this.selectPowerCard(sprite);
      this.closePlayerHand();
      this.leavePlayerHand();
      this.addAction(this.commandSelectPowerCard);
    };
  }

  commandSelectPowerCard() {
    this.changeStep(ActivatePowerCardStep);
    if (typeof this._finish === 'function') return this._finish();
  }

  commandGetHandSprites(index) {
    return this._cardsetSprite.getSprites(index)
  }

  selectPowerCard(sprites) {
    this.addActions([
      [this.commandSelectMovement, sprites],
    ]);
  }

  commandSelectMovement(sprites) {
    const cardset = this._cardsetSprite;
    cardset.addChildToEnd(sprites);
    cardset.zoomAllCards(sprites);
    cardset.zoomOutAllCards(sprites);
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
    this._cardsetSprite.closeCards();
  }

  leavePlayerHand() {
    this.addAction(this.commandLeavePlayerHand);
  }

  commandLeavePlayerHand() {
    this.removeChildren([
      this._locationWindow,
      this._cardNameWindow,
      this._cardDescriptionWindow,
      this._cardPropsWindow,
      this._cardsetSprite,
      this._player.boardWindow,
    ]);
  }

  createOnCancelHandler(manager) {
    return this.createOnCancelHandlerLoadPhase();
    // deve ser configuravel ao criar a classe
  }

  createOnCancelHandlerLoadPhase() {
    return () => {
      this.closePlayerHand();
      this.leavePlayerHand();
      this.addAction(this.commandToGoBack);
    };
  }

  commandToGoBack() {
    this.changeStep(TurnStep);
    if (typeof this._finish === 'function') return this._finish();
  }

  openCardsetSprite(manager) {
    const onChangeCursor = this.createOnChangeCursor(manager);
    const onSelectHandler = this.createOnSelectHandler(manager);
    const onCancelHandler = this.createOnCancelHandler(manager);
    this.addActions([
      this.commandOpenPlayerHand,
      [this.commandPlayerHandSelectMode, onSelectHandler, onChangeCursor, onCancelHandler]
    ]);
  }

  commandOpenPlayerHand() {
    this._cardsetSprite.openCards();
  }

  commandPlayerHandSelectMode(onSelectHandler, onChangeCursor, onCancelHandler) {
    const selectCards = this._config.selectCards;
    this._cardsetSprite.selectMode(selectCards, onSelectHandler, onChangeCursor, onCancelHandler);
  }

  openAllWindows() {
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

  finish(phase) {
    if (typeof this._finish === 'function') return this._finish();
    switch (phase) {
      case null:
        break;
      default:
        break;
    }
  }

  isBusy() {
    const children = [
      this._cardsetSprite,
      this._locationWindow,
      this._cardNameWindow,
      this._cardDescriptionWindow,
      this._cardPropsWindow,
    ];
    return super.isBusy() || children.some(obj => (obj?.isBusy ? obj.isBusy() : false));
  }
}