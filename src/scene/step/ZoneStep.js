class ZoneStep extends Step {
  _config = undefined;
  _cardsetSprite = undefined;
  _locationWindow = undefined;
  _cardNameWindow = undefined;
  _cardDescriptionWindow = undefined;
  _cardPropsWindow = undefined;

  constructor(scene, phase, config) {
    const phasesEnabled = [GameConst.LOAD_PHASE];
    if (!phasesEnabled.some(p => p === phase)) {
      throw new Error('Invalid phase for ZoneStep.');
    }
    super(scene, phase);
    if (typeof config !== 'object') {
      throw new Error('config must be an object.');
    }
    if (typeof config?.location !== 'string') {
      throw new Error('config.location must be a string.');
    }
    if (config?.player !== GameConst.PLAYER && config?.player !== GameConst.CHALLENGED) {
      throw new Error('config.player must be GameConst.PLAYER or GameConst.CHALLENGED');
    }
    this.setConfig(config);
  }

  setConfig(config) {
    switch (this.getPhase()) {
      case GameConst.LOAD_PHASE:
        this.setConfigLoadPhase(config);
        break;
      default:
        break;
    }
  }

  setConfigLoadPhase(config) {
    this._config = {
      location: config.location,
      player: config.player,
      selectCards: 1,
      checkElementSuficiencia: false,
      blockBattleCards: true,
      blockPowerCards: false,
      blockPowerCardsInLoadPhase: true,
      blockPowerCardsInCompilePhase: false,
    };
  }

  start() {
    this.createZone();
    this.openZone();
  }

  createZone() {
    this.createBoardWindow();
    const cards = this.getCards();
    const cardsetSprite = this.createCardsetSprite(cards);
    this.createAllWindows(cardsetSprite);
  }

  createBoardWindow() {
    const { energies, cardsInDeck, cardsInHand, passed } = this.getBoardData();
    this.createPlayerBoardWindow(energies, cardsInDeck, cardsInHand, passed);
  }

  getBoardData() {
    const player = this.getPlayer();
    if (player === GameConst.CHALLENGED) {
      return this.getChallengedBoardData();
    }
    return this.getPlayerBoardData();
  }

  getPlayer() {
    return this._config.player;
  }

  getPlayerBoardData() {
    const energies = Object.values(CardBattleManager.getPlayerEnergies());
    const cardsInDeck = CardBattleManager.getPlayerDeckLength();
    const cardsInHand = CardBattleManager.getPlayerHandLength();
    const passed = CardBattleManager.isPlayerPassed();
    return { energies, cardsInDeck, cardsInHand, passed };
  }

  getChallengedBoardData() {
    const energies = Object.values(CardBattleManager.getChallengedEnergies());
    const cardsInDeck = CardBattleManager.getChallengedDeckLength();
    const cardsInHand = CardBattleManager.getChallengedHandLength();
    const passed = CardBattleManager.isChallengedPassed();
    return { energies, cardsInDeck, cardsInHand, passed };
  }

  getCards(indexes) {
    const { 
      location, 
      player, 
      blockBattleCards, 
      blockPowerCards, 
      blockPowerCardsInLoadPhase, 
      blockPowerCardsInCompilePhase 
    } = this.getConfig();
    const config = {
      location, 
      player, 
      blockBattleCards,
      blockPowerCardsInLoadPhase 
    };
    return CardBattleManager.getCards(config, indexes);
  }

  getConfig() {
    return this._config;
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
    this._cardsetSprite = cardsetSprite;
    this.commandAddChild(cardsetSprite);
  }

  createAllWindows(cardsetSprite) {
    this.createLocationWindow(cardsetSprite);
    this.createCardNameWindow(cardsetSprite);
    this.createCardDescriptionWindow(cardsetSprite);
    this.createCardPropsWindow(cardsetSprite);
  }

  createLocationWindow(cardsetSprite = this._cardsetSprite) {
    const locationWindow = TextWindow.createWindowMiddleSize(0, 0);
    locationWindow.alignStartTop();
    locationWindow.alignAboveOf(cardsetSprite);
    locationWindow.y -= 160;
    locationWindow.alignTextCenter();
    this.addAction(this.commandCreateLocationWindow, locationWindow);
  }

  commandCreateLocationWindow(locationWindow) {
    this._locationWindow = locationWindow;
    this.commandAddChild(locationWindow);
  }

  createCardNameWindow(cardsetSprite = this._cardsetSprite) {
    const cardNameWindow = TextWindow.createWindowMiddleSize(0, 0);
    cardNameWindow.alignEndTop();
    cardNameWindow.alignAboveOf(cardsetSprite);
    cardNameWindow.y -= 160;
    this.addAction(this.commandCreateCardNameWindow, cardNameWindow);
  }
  
  commandCreateCardNameWindow(cardNameWindow) {
    this._cardNameWindow = cardNameWindow;
    this.commandAddChild(cardNameWindow);
  }

  createCardDescriptionWindow(cardsetSprite = this._cardsetSprite) {
    const cardDescriptionWindow = TextWindow.createWindowMiddleSize(0, 0);
    cardDescriptionWindow.alignStartBottom();
    cardDescriptionWindow.alignBelowOf(cardsetSprite);
    cardDescriptionWindow.y += 100;
    this.addAction(this.commandCreateCardDescriptionWindow, cardDescriptionWindow);
  }

  commandCreateCardDescriptionWindow(cardDescriptionWindow) {
    this._cardDescriptionWindow = cardDescriptionWindow;
    this.commandAddChild(cardDescriptionWindow);
  }

  createCardPropsWindow(cardsetSprite = this._cardsetSprite) {
    const cardPropsWindow = TextWindow.createWindowMiddleSize(0, 0);
    cardPropsWindow.alignEndBottom();
    cardPropsWindow.alignBelowOf(cardsetSprite);
    cardPropsWindow.y += 100;
    this.addAction(this.commandCreateCardPropsWindow, cardPropsWindow);
  }

  commandCreateCardPropsWindow(cardPropsWindow) {
    this._cardPropsWindow = cardPropsWindow;
    this.commandAddChild(cardPropsWindow);
  }

  openZone() {
    this.openCardsetSprite();
    this.openAllWindows();
  }
  
  openCardsetSprite() {
    const onChangeCursor = this.createOnMoveCursor();
    const onSelectHandler = this.createOnSelectHandler();
    const onCancelHandler = this.createGoBackHandler();
    this.addActions([
      this.commandOpenCardsetSprite,
      [this.commandCardsetSpriteSelectMode, onSelectHandler, onChangeCursor, onCancelHandler]
    ]);
  }

  createOnMoveCursor() {
    return index => {
      this.commandSetTextCardNameWindow(this.getCardNameByCardIndex(index));
      this.commandSetTextCardDescriptionWindow(this.getCardDescriptionByCardIndex(index));
      this.commandSetTextCardPropsWindow(this.getCardPropsByCardIndex(index));
      this.addAction(this.commandMoveCursor, index);
    };
  }

  getCardNameByCardIndex(index) {
    const cards = this.getCards(index);
    if (cards.length === 0) return '';
    return cards[0].name;
  }

  getCardDescriptionByCardIndex(index) {
    const cards = this.getCards(index);
    if (cards.length === 0) return '';
    return cards[0].description;
  }

  getCardPropsByCardIndex(index) {
    const cards = this.getCards(index);
    if (cards.length === 0) return '';
    const { type, attack, health } = cards[0];
    if (type === GameConst.POWER) {
      return `${attack}/${health}`;
    }
    return 'power card';
  }

  commandSetTextCardNameWindow(text) {
    text = ArrayHelper.toArray(text);
    this._cardNameWindow.refreshContent(text);
  }

  commandSetTextCardDescriptionWindow(text) {
    text = ArrayHelper.toArray(text);
    this._cardDescriptionWindow.refreshContent(text);
  }

  commandSetTextCardPropsWindow(text) {
    text = ArrayHelper.toArray(text);
    this._cardPropsWindow.refreshContent(text);
  }

  commandMoveCursor(index) {
    switch (this.getPhase()) {
      case GameConst.LOAD_PHASE:
        this.commandMoveCursorLoadPhase(index);
        break;
      default:
        break;
    }
  }

  commandMoveCursorLoadPhase(index) {
    // evento que captura o movimento do cursor
  }

  createOnSelectHandler() {
    return cardIndexs => {
      const sprite = this.commandGetHandSprites(cardIndexs).shift();
      this.selectPowerCard(sprite);
      this.closeZone();
      this.leaveZone();
      this.addAction(this.commandSelectHandler, cardIndexs);
    };
  }

  commandGetHandSprites(index) {
    return this._cardsetSprite.getSprites(index);
  }

  selectPowerCard(sprites) {
    this.addAction(this.commandSelectMovement, sprites);
  }

  commandSelectMovement(sprites) {
    const cardset = this._cardsetSprite;
    cardset.addChildToEnd(sprites);
    cardset.zoomAllCards(sprites);
    cardset.zoomOutAllCards(sprites);
  }

  closeZone() {
    this.closeWindows();
    this.closeCardsetSprite();
  }

  closeWindows() {
    this.addActions([
      this.commandCloseLocationWindow,
      this.commandCloseCardNameWindow,
      this.commandCloseCardDescriptionWindow,
      this.commandCloseCardPropsWindow,
      this.commandClosePlayerBoardWindow,
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

  closeCardsetSprite() {
    this.addAction(this.commandCloseCardsetSprite);
  }

  commandCloseCardsetSprite() {
    this._cardsetSprite.closeCards();
  }

  leaveZone() {
    this.leaveCardsetSprite();
    this.leaveWindows();
  }

  leaveCardsetSprite() {
    this.addAction(this.commandLeavePlayerHand);
  }

  commandLeavePlayerHand() {
    this.removeChildren([
      this._cardsetSprite
    ]);
  }

  leaveWindows() {
    this.addAction(this.commandLeaveWindows);
  }

  commandLeaveWindows() {
    this.removeChildren([
      this._locationWindow,
      this._cardNameWindow,
      this._cardDescriptionWindow,
      this._cardPropsWindow,
      this.getPlayerBoardWindow(),
    ]);
  }

  commandSelectHandler(cardIndexs) {
    switch (this.getPhase()) {
      case GameConst.LOAD_PHASE:
        this.commandSelectHandlerLoadPhase(cardIndexs);
        break;
      default:
        break;
    }
  }

  commandSelectHandlerLoadPhase(cardIndexs) {
    const powerConfig = { cardIndexes, player: GameConst.PLAYER };
    this.changeStep(ActivationSlotStep, powerConfig);
  }

  createGoBackHandler() {
    return () => {
      this.closeWindows();
      this.closeCardsetSprite();
      this.leaveCardsetSprite();
      this.addAction(this.commandGoBack);
    };
  }

  commandGoBack() {
    switch (this.getPhase()) {
      case GameConst.LOAD_PHASE:
        this.commandGoBackLoadPhase();
        break;
      default:
        break;
    }
  }

  commandGoBackLoadPhase() {
    this.changeStep(TurnStep);
  }

  commandOpenCardsetSprite() {
    this._cardsetSprite.openCards();
  }

  commandCardsetSpriteSelectMode(onSelectHandler, onChangeCursor, onCancelHandler) {
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

  commandFinish() {
    const phase = this.getPhase();
    switch (phase) {
      case GameConst.LOAD_PHASE:
        break;
      default:
        break;
    }
    this.end();
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

  isLocationWindowVisible() {
    return this._locationWindow?.visible;
  }

  isCardNameWindowVisible() {
    return this._cardNameWindow?.visible;
  }

  isCardDescriptionWindowVisible() {
    return this._cardDescriptionWindow?.visible;
  }

  isCardPropsWindowVisible() {
    return this._cardPropsWindow?.visible;
  }

  isCardsetSpriteVisible() {
    return this._cardsetSprite?.visible;
  }

  selectCard(indexes) {
    indexes = ArrayHelper.toArray(indexes);
    this.addAction(this.commandSelectCard, indexes);
  }

  commandSelectCard(indexes) {
    this._cardsetSprite.select(indexes);
  }

  cancel() {
    this.addAction(this.commandCancel);
  }

  commandCancel() {
    this._cardsetSprite.cancel();
  }

  isLocationWindowText(text) {
    return this._locationWindow.isTextWasDrawn('TEXT_0', text);
  }

  isCardNameWindowText(text) {
    return this._cardNameWindow.isTextWasDrawn('TEXT_0', text);
  }

  isCardDescriptionWindowText(text) {
    return this._cardDescriptionWindow.isTextWasDrawn('TEXT_0', text);
  }

  isCardPropsWindowText(text) {
    return this._cardPropsWindow.isTextWasDrawn('TEXT_0', text);
  }

  allCardsAreOpen() {
    return this._cardsetSprite.allCardsAreOpen();
  }
}