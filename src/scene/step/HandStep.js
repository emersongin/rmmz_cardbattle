class HandStep extends Step {
  _gamePlayer;
  _playerHand;
  _locationWindow;
  _cardNameWindow;
  _cardDescriptionWindow;
  _cardPropsWindow;

  constructor(scene, phase, player, finish) {
    super(scene, phase, finish);
    this._gamePlayer = player;
  }

  getPlayer() {
    return this._gamePlayer;
  }

  start(manager) {
    const player = this.getPlayer();
    this.createBoardWindow(manager);
    if (player === GameConst.PLAYER) {
      this.createPlayerHandset(manager);
    }
    if (player === GameConst.CHALLENGED) {

    }
    this.openPlayerHand(manager);
  }

  createBoardWindow(manager) {
    const energies = Object.values(manager.getPlayerEnergies());
    const cardsInDeck = manager.getPlayerDeckLength();
    const cardsInHand = manager.getPlayerHandLength();
    const passed = manager.isPlayerPassed();
    this.createPlayerBoardWindow(energies, cardsInDeck, cardsInHand, passed);
  }

  createPlayerHandset(manager) {
    const cardsInHand = manager.getPlayerHand();
    const disableIndexes = this.getDisabledCardsIndexesOfPlayerHandByPhase(manager);
    const cardsetSprite = this.createPlayerHandCardset(cardsInHand, disableIndexes);
    this.createWindows(cardsetSprite);
  }

  getDisabledCardsIndexesOfPlayerHandByPhase(manager) {
    const phase = this.getPhase();
    switch (phase) {
      case GameConst.LOAD_PHASE:
        return manager.getDisabledCardsIndexesOfPlayerHandInLoadPhase();
      default:
        return [];
    }
  }

  createWindows(cardsetSprite) {
    const locationWindow = this.createLocationWindow(cardsetSprite);
    const cardNameWindow = this.createCardNameWindow(cardsetSprite);
    const cardDescriptionWindow = this.createCardDescriptionWindow(cardsetSprite);
    const cardPropsWindow = this.createCardPropsWindow(cardsetSprite);
    return { locationWindow, cardNameWindow, cardDescriptionWindow, cardPropsWindow };
  }

  createPlayerHandCardset(cards, disableIndexes) {
    const x = ScreenHelper.getCenterPosition(CardsetSprite.contentOriginalWidth());
    const y = ScreenHelper.getMiddlePosition(CardsetSprite.contentOriginalHeight());
    const cardsetSprite = CardsetSprite.create(x, y);
    cardsetSprite.show();
    const sprites = cardsetSprite.listCards(cards);
    cardsetSprite.startClosedCards(sprites);
    const disableSprites = sprites.filter((sprite, index) => disableIndexes.includes(index));
    cardsetSprite.disableCards(disableSprites);
    this.addAction(this.commandCreatePlayerHandCardset, cardsetSprite);
    return cardsetSprite;
  }

  commandCreatePlayerHandCardset(cardsetSprite) {
    this._playerHand = cardsetSprite
    this.commandAddChild(cardsetSprite);
  }

  createLocationWindow(playerHand = this._playerHand) {
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

  createCardNameWindow(playerHand = this._playerHand) {
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

  createCardDescriptionWindow(playerHand = this._playerHand) {
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

  createCardPropsWindow(playerHand = this._playerHand) {
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
    const phase = this.getPhase();
    switch (phase) {
      case GameConst.LOAD_PHASE:
        return this.createOnChangeCursorLoadPhase(manager);
      default:
        return this.createOnChangeCursorDefault();
    }
  }

  createOnChangeCursorLoadPhase(manager) {
    return index => {
      const card = manager.getCardPlayerHandByIndex(index);
      this.commandSetTextCardNameWindow(['card.name' + index]);
      this.commandSetTextCardDescriptionWindow(['card.description' + index]);
      this.commandSetTextCardPropsWindow(['card.props' + index]);
    };
  }

  createOnChangeCursorDefault() {
    return () => {};
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
    const phase = this.getPhase();
    switch (phase) {
      case GameConst.LOAD_PHASE:
        return this.createOnSelectHandlerLoadPhase();
      default:
        return this.createOnSelectHandlerDefault();
    }
  }

  createOnSelectHandlerDefault() {
    return () => {};
  }

  createOnSelectHandlerLoadPhase() {
    return cardIndexs => {
      const sprite = this.commandGetHandSprites(cardIndexs);
      this.selectPowerCard(sprite);
      this.closePlayerHand();
      this.leavePlayerHand();
      this.addAction(this.commandSelectPowerCard);
    };
  }

  commandSelectPowerCard() {
    this.changeStep(ActivatePowerCardStep);
    if (typeof this._finish === 'function') return this._finish();
    this.destroy();
  }

  commandGetHandSprites(index) {
    return this._playerHand.getSprites(index);
  }

  selectPowerCard(sprites) {
    this.addActions([
      [this.commandSelectMovement, sprites],
    ]);
  }

  commandSelectMovement(sprites) {
    const cardset = this._playerHand;
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
    this._playerHand.closeCards();
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
      this._playerHand,
      this._player.boardWindow,
    ]);
  }

  createOnCancelHandler(manager) {
    const phase = this.getPhase();
    switch (phase) {
      case GameConst.LOAD_PHASE:
        return this.createOnCancelHandlerLoadPhase();
      default:
        return this.createOnCancelHandlerDefault();
    }
  }

  createOnCancelHandlerLoadPhase() {
    return () => {
      this.closePlayerHand();
      this.leavePlayerHand();
      this.addAction(this.commandToGoBack);
    };
  }

  createOnCancelHandlerDefault() {
    return () => {};
  }

  commandToGoBack() {
    this.changeStep(TurnStep);
    if (typeof this._finish === 'function') return this._finish();
    this.destroy();
  }

  openPlayerHand(manager) {
    const onChangeCursor = this.createOnChangeCursor(manager);
    const onSelectHandler = this.createOnSelectHandler(manager);
    const onCancelHandler = this.createOnCancelHandler(manager);
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

  commandOpenPlayerHand() {
    this._playerHand.openCards();
  }

  commandPlayerHandSelectMode(onSelectHandler, onChangeCursor, onCancelHandler) {
    const selectNumber = 1;
    this._playerHand.selectMode(selectNumber, onSelectHandler, onChangeCursor, onCancelHandler);
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
      this._playerHand,
      this._locationWindow,
      this._cardNameWindow,
      this._cardDescriptionWindow,
      this._cardPropsWindow,
    ];
    return super.isBusy() || children.some(obj => (obj?.isBusy ? obj.isBusy() : false));
  }
}