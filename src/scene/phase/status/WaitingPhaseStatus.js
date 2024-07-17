class WaitingPhaseStatus  {
  _phase;
  _textWindow;
  _askWindow;

  _playerHand;
  _locationWindow;
  _cardNameWindow;
  _cardDescriptionWindow;
  _cardPropsWindow;

  constructor(phase) {
    if (phase instanceof LoadPhase === false) {
      throw new Error("phase is not an instance of LoadPhase");
    }
    this._phase = phase;
    this.start();
  }

  start() {
    const that = this._phase;
    const title = 'Load Phase';
    const description = 'Select and use a Program Card.';
    that.createTitleWindow(title);
    that.createDescriptionWindow(description);
    that.openTextWindows();
    that.setStep(GameConst.START_PHASE);
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
    return children.some(obj => (obj && obj.isBusy ? obj.isBusy() : false));
  }

  update(manager) {
    this.updateStepStart(manager);
    this.updateStepBeginLoadPhase(manager);
    this.updateStartPlay(manager);
    this.updateStepChallengedLoadPhase(manager);
    this.updateStepPlayerLoadPhase(manager);
    this.updateStepPowerfieldLoadPhase(manager);
    if (manager.isEndPlays() && manager.getPowerfieldLength()) return; 
    this.updateStepEnd(manager);
  }

  updateStepStart(manager) {
    const that = this._phase;
    const isStartPhase = that.isCurrentStep(GameConst.START_PHASE);
    if (isStartPhase && Input.isTriggered('ok')) {
      that.commandCloseTextWindows();
      that.leaveTextWindows();
      this.createPlayerGameBoard(manager);
      this.createChallengedGameBoard(manager);
      that.openGameBoards();
      const text = 'Begin Load Phase';
      this.createTextWindow(text);
      this.openBeginLoadPhaseWindow();
      that.setStep(GameConst.BEGIN_LOAD_PHASE);
    }
  }

  createPlayerGameBoard(manager) {
    const that = this._phase;
    const energies = Object.values(manager.getPlayerEnergies());
    const cardsInDeck = manager.getPlayerDeckLength();
    const cardsInHand = manager.getPlayerHandLength();
    const cardsInTrash = manager.getPlayerTrashLength();
    const victories = manager.getPlayerVictories();
    const passed = manager.isPlayerPassed();
    const boardWindow = that.createPlayerBoardWindow(energies, cardsInDeck, cardsInHand, passed);
    const boardWindowHeight = boardWindow.height;
    const battleWindow = that.createPlayerBattleWindow(boardWindowHeight);
    const trashWindow = that.createPlayerTrashWindow(cardsInTrash);
    const scoreWindow = that.createPlayerScoreWindow(victories, boardWindowHeight);
    const battlefield = that.createPlayerBattlefield();
  }

  createChallengedGameBoard(manager) {
    const that = this._phase;
    const energies = Object.values(manager.getChallengedEnergies());
    const cardsInDeck = manager.getChallengedDeckLength();
    const cardsInHand = manager.getChallengedHandLength();
    const cardsInTrash = manager.getChallengedTrashLength();
    const victories = manager.getChallengedVictories();
    const passed = manager.isChallengedPassed();
    const boardWindow = that.createChallengedBoardWindow(energies, cardsInDeck, cardsInHand, passed);
    const boardWindowHeight = boardWindow.height;
    const battleWindow = that.createChallengedBattleWindow(boardWindowHeight);
    const trashWindow = that.createChallengedTrashWindow(cardsInTrash);
    const scoreWindow = that.createChallengedScoreWindow(victories, boardWindowHeight);
    const battlefield = that.createChallengedBattlefield();
  }

  createTextWindow(text) {
    const that = this._phase;
    const textWindow = TextWindow.createWindowFullSize(0, 0, [text]);
    textWindow.alignCenterMiddle();
    textWindow.alignTextCenter();
    that.addAction(this.commandCreateTextWindow.bind(this), textWindow);
    return textWindow;
  }

  commandCreateTextWindow(textWindow) {
    const that = this._phase;
    this._textWindow = textWindow;
    that.commandAddChild(textWindow);
  }

  openBeginLoadPhaseWindow() {
    const that = this._phase;
    that.addAction(this.commandOpenTextWindow.bind(this));
  }

  commandOpenTextWindow() {
    this._textWindow.open();
  }

  updateStepBeginLoadPhase(manager) {
    const that = this._phase;
    const isBegin = that.isCurrentStep(GameConst.BEGIN_LOAD_PHASE);
    if (isBegin && Input.isTriggered('ok')) {
      this.closeBeginLoadPhaseWindow();
      this.leaveBeginLoadPhaseWindow();
      that.setStep(GameConst.TURN_PHASE);
    }
  }

  closeBeginLoadPhaseWindow() {
    const that = this._phase;
    that.addAction(this.commandCloseTextWindow.bind(this));
  }

  commandCloseTextWindow() {
    this._textWindow.close();
  }

  leaveBeginLoadPhaseWindow() {
    const that = this._phase;
    that.addAction(this.commandLeaveBeginLoadPhaseWindow.bind(this));
  }

  commandLeaveBeginLoadPhaseWindow() {
    const that = this._phase;
    that.removeChild(this._textWindow);
  }

  updateStartPlay(manager) {
    const that = this._phase;
    const isTurnPhase = that.isCurrentStep(GameConst.TURN_PHASE);
    if (manager.isStartPlays() && isTurnPhase) {
      if (manager.startPlay) {
        that.setStep(GameConst.PLAYER_TURN_PHASE);
      } else {
        that.setStep(GameConst.CHALLENGE_TURN_PHASE);
      }
    }
  }

  updateStepChallengedLoadPhase(manager) {
    const that = this._phase;
    const isChallengedTurnPhase = that.isCurrentStep(GameConst.CHALLENGE_TURN_PHASE);
    if (isChallengedTurnPhase) {
      manager.challengePassed();
      that.challengePass();
      that.stepWainting();
      if (manager.isPlayerPassed() === false) that.setStep(GameConst.PLAYER_TURN_PHASE);
    }
  }

  updateStepPlayerLoadPhase(manager) {
    const that = this._phase;
    const isPlayerTurnPhase = that.isCurrentStep(GameConst.PLAYER_TURN_PHASE);
    if (isPlayerTurnPhase) {
      const commandYes = () => {
        this.commandCloseAskWindow();
        this.leaveAskWindow();
        that.closeGameBoards();
        that.leaveGameBoards();
        this.commandPlayerHand(manager);
      };
      const commandNo = () => {
        this.commandCloseAskWindow();
        this.leaveAskWindow();
        this.commandPlayerPassed(manager);
      };
      this.createAskWindow('Use a Program Card?', commandYes, commandNo);
      this.openAskWindow();
      that.stepWainting();
    }
  }

  createAskWindow(text, yesHandler, noHanlder) {
    const that = this._phase;
    const commandYes = CommandWindow.createCommand('Yes', 'YES', yesHandler);
    const commandNo = CommandWindow.createCommand('No', 'NO', noHanlder);
    const askWindow = CommandWindow.create(0, 0, [text], [commandYes, commandNo]);
    askWindow.alignBottom();
    that.addAction(this.commandCreateAskWindow.bind(this), askWindow);
    return askWindow;
  }

  commandCreateAskWindow(askWindow) {
    const that = this._phase;
    this._askWindow = askWindow;
    that.commandAddChild(askWindow);
  }

  openAskWindow() {
    const that = this._phase;
    that.addAction(this.commandOpenAskWindow.bind(this));
  }

  commandOpenAskWindow() {
    this._askWindow.open();
  }

  commandCloseAskWindow() {
    this._askWindow.close();
  }

  leaveAskWindow() {
    const that = this._phase;
    that.addAction(this.commandLeaveAskWindow.bind(this));
  }

  commandLeaveAskWindow() {
    const that = this._phase;
    that.removeChild(this._askWindow);
  }

  commandPlayerHand(manager) {
    const that = this._phase;
    const onChangeCursor = index => {
      const card = manager.getCardPlayerHandByIndex(index);
      this.commandSetTextCardNameWindow(['card.name' + index]);
      this.commandSetTextCardDescriptionWindow(['card.description' + index]);
      this.commandSetTextCardPropsWindow(['card.props' + index]);
    };
    const onSelectHandler = cardIndexs => {
      const sprite = this.commandGetHandSprites(cardIndexs);
      this.selectPowerCard(sprite);
      this.closePlayerHand();
      this.leavePlayerHand();
      this.createPlayerGameBoard(manager);
      this.createChallengedGameBoard(manager);
      that.openGameBoards();
      const cards = cardIndexs.map(index => manager.getCardPlayerHandByIndex(index));
      that.createPowerfield(cards);
      that.openPowerfield();
      that.activePowerCard(cardIndexs[0], manager, GameConst.PLAYER);
      that.setStep(GameConst.ACTIVE_POWER_CARD);
    };
    const onCancelHandler = () => {
      this.closePlayerHand();
      this.leavePlayerHand();
      this.createPlayerGameBoard(manager);
      this.createChallengedGameBoard(manager);
      that.openGameBoards();
      that.setStep(GameConst.PLAYER_TURN_PHASE);
    };

    const playerEnergies = Object.values(manager.getPlayerEnergies());
    const playerCardsInDeck = manager.getPlayerDeckLength();
    const playerCardsInHand = manager.getPlayerHandLength();
    const playerPassed = manager.isPlayerPassed();
    that.createPlayerBoardWindow(playerEnergies, playerCardsInDeck, playerCardsInHand, playerPassed);
    
    // manager.getPlayerDisabledIndexesInLoadPhase
    const cardsInHand = manager.getPlayerHand();
    const disableCards = cardsInHand.map((card, index) => {
      return {
        index,
        disable: card.type !== GameConst.POWER || card.isActiveInLoadPhase === false,
      };
    });
    const disableIndexes = disableCards.filter(card => card.disable).map(card => card.index);

    this.createPlayerHandset(cardsInHand, disableIndexes);
    this.openPlayerHand(onSelectHandler, onChangeCursor, onCancelHandler);
  }

  createPlayerHandset(cards, disableIndexes) {
    const playerHand = this.createPlayerHand(cards, disableIndexes);
    const locationWindow = this.createLocationWindow(playerHand);
    const cardNameWindow = this.createCardNameWindow(playerHand);
    const cardDescriptionWindow = this.createCardDescriptionWindow(playerHand);
    const cardPropsWindow = this.createCardPropsWindow(playerHand);
    return { playerHand, locationWindow, cardNameWindow, cardDescriptionWindow, cardPropsWindow };
  }

  createPlayerHand(cards, disableIndexes) {
    const that = this._phase;
    const x = ScreenHelper.getCenterPosition(CardsetSprite.contentOriginalWidth());
    const y = ScreenHelper.getMiddlePosition(CardsetSprite.contentOriginalHeight());
    const playerHand = CardsetSprite.create(x, y);
    playerHand.show();
    const sprites = playerHand.listCards(cards);
    playerHand.startClosedCards(sprites);
    const disableSprites = sprites.filter((sprite, index) => disableIndexes.includes(index));
    playerHand.disableCards(disableSprites);
    that.addAction(this.commandCreatePlayerHand.bind(this), playerHand);
    return playerHand;
  }

  commandCreatePlayerHand(playerHand) {
    const that = this._phase;
    this._playerHand = playerHand
    that.commandAddChild(playerHand);
  }

  createLocationWindow(playerHand = this._playerHand) {
    const that = this._phase;
    const locationWindow = TextWindow.createWindowMiddleSize(0, 0);
    locationWindow.alignStartTop();
    locationWindow.alignAboveOf(playerHand);
    locationWindow.y -= 160;
    locationWindow.alignTextCenter();
    that.addAction(this.commandCreateLocationWindow.bind(this), locationWindow);
    return locationWindow;
  }

  commandCreateLocationWindow(locationWindow) {
    const that = this._phase;
    this._locationWindow = locationWindow;
    that.commandAddChild(locationWindow);
  }

  createCardNameWindow(playerHand = this._playerHand) {
    const that = this._phase;
    const cardNameWindow = TextWindow.createWindowMiddleSize(0, 0);
    cardNameWindow.alignEndTop();
    cardNameWindow.alignAboveOf(playerHand);
    cardNameWindow.y -= 160;
    that.addAction(this.commandCreateCardNameWindow.bind(this), cardNameWindow);
    return cardNameWindow;
  }

  commandCreateCardNameWindow(cardNameWindow) {
    const that = this._phase;
    this._cardNameWindow = cardNameWindow;
    that.commandAddChild(cardNameWindow);
  }

  createCardDescriptionWindow(playerHand = this._playerHand) {
    const that = this._phase;
    const cardDescriptionWindow = TextWindow.createWindowMiddleSize(0, 0);
    cardDescriptionWindow.alignStartBottom();
    cardDescriptionWindow.alignBelowOf(playerHand);
    cardDescriptionWindow.y += 100;
    that.addAction(this.commandCreateCardDescriptionWindow.bind(this), cardDescriptionWindow);
    return cardDescriptionWindow;
  }

  commandCreateCardDescriptionWindow(cardDescriptionWindow) {
    const that = this._phase;
    this._cardDescriptionWindow = cardDescriptionWindow;
    that.commandAddChild(cardDescriptionWindow);
  }

  createCardPropsWindow(playerHand = this._playerHand) {
    const that = this._phase;
    const cardPropsWindow = TextWindow.createWindowMiddleSize(0, 0);
    cardPropsWindow.alignEndBottom();
    cardPropsWindow.alignBelowOf(playerHand);
    cardPropsWindow.y += 100;
    that.addAction(this.commandCreateCardPropsWindow.bind(this), cardPropsWindow);
    return cardPropsWindow;
  }

  commandCreateCardPropsWindow(cardPropsWindow) {
    const that = this._phase;
    this._cardPropsWindow = cardPropsWindow;
    that.commandAddChild(cardPropsWindow);
  }

  openPlayerHand(onSelectHandler, onChangeCursor, onCancelHandler) {
    const that = this._phase;
    that.addActions([
      this.commandOpenPlayerHand.bind(this),
      [this.commandPlayerHandSelectMode.bind(this), onSelectHandler, onChangeCursor, onCancelHandler]
    ]);
    that.addActions([
      this.commandSetTextLocationWindow.bind(this),
      this.commandOpenLocationWindow.bind(this),
      this.commandOpenCardNameWindow.bind(this),
      this.commandOpenCardDescriptionWindow.bind(this),
      this.commandOpenCardPropsWindow.bind(this),
      that.commandOpenPlayerBoardWindow,
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

  commandGetHandSprites(index) {
    return this._playerHand.getSprites(index);
  }

  selectPowerCard(sprites) {
    const that = this._phase;
    that.addActions([
      [this.commandSelectMovement.bind(this), sprites],
    ]);
  }

  commandSelectMovement(sprites) {
    const cardset = this._playerHand;
    cardset.addChildToEnd(sprites);
    cardset.zoomAllCards(sprites);
    cardset.zoomOutAllCards(sprites);
  }

  closePlayerHand() {
    const that = this._phase;
    that.addActions([
      this.commandCloseLocationWindow.bind(this),
      this.commandCloseCardNameWindow.bind(this),
      this.commandCloseCardDescriptionWindow.bind(this),
      this.commandCloseCardPropsWindow.bind(this),
      that.commandClosePlayerBoardWindow,
    ]);
    that.addActions([
      this.commandClosePlayerHand.bind(this)
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
    const that = this._phase;
    that.addAction(this.commandLeavePlayerHand.bind(this));
  }

  commandLeavePlayerHand() {
    const that = this._phase;
    that.removeChildren([
      this._locationWindow,
      this._cardNameWindow,
      this._cardDescriptionWindow,
      this._cardPropsWindow,
      this._playerHand,
      that._player.boardWindow,
    ]);
  }

  commandPlayerPassed(manager) {
    const that = this._phase;
    manager.playerPassed();
    that.playerPass();
    that.stepWainting();
    if (manager.isChallengedPassed() === false) that.setStep(GameConst.CHALLENGE_TURN_PHASE);
  }

  updateStepPowerfieldLoadPhase(manager) {
    const that = this._phase;
    // console.log(manager, manager.isEndPlays(), manager.getPowerfieldLength());
    if (manager.isEndPlays() && manager.getPowerfieldLength()) {
      const { card: powerCard } = manager.getPowerfieldLastCardSlot();
      const cardIndex = manager.getPowerfieldLength() - 1;
      const sprite = that.commandGetPowerfieldSprites(cardIndex);
      that.animateCastPowerCard(sprite, cardIndex);
      that.runPowerCard(manager, powerCard);
      that.setStep(GameConst.ACTIVE_POWER_CARD);
      manager.removePowerfieldLastCardSlot();
    }
  }

  updateStepEnd(manager) {
    const that = this._phase;
    const isNotFinished = that.isCurrentStep(GameConst.END_PHASE) === false;
    if (manager.isEndPlays() && isNotFinished) {
      that.addWait();
      that.closeGameBoards();
      that.leaveGameBoards();
      that.addAction(manager.endPhase.bind(this));
      that.stepEnd();
    }
  }

  activePowerCard(cardIndexHand, manager, player) {
    this._phase.changeStatus(ActivePowerCardPhaseStatus, cardIndexHand, manager, player);
  }

  runPowerCard(manager, powerCard) {
    this._phase.changeStatus(RunPowerCardPhaseStatus, manager, powerCard);
  }

  waitStatus() {
    return false;
  }

  isPlayerHandVisible() {
    return this._playerHand.visible;
  }

  isTextWindowVisible() {
    return this._textWindow.visible;
  }

  isAskWindowVisible() {
    return this._askWindow.visible;
  }

  isLocationWindowVisible() {
    return this._locationWindow.visible;
  }

  isCardNameWindowVisible() {
    return this._cardNameWindow.visible;
  }

  isCardDescriptionWindowVisible() {
    return this._cardDescriptionWindow.visible;
  }

  isCardPropsWindowVisible() {
    return this._cardPropsWindow.visible;
  }
}