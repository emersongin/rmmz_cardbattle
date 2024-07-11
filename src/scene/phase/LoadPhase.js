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
    const textWindow = TextWindow.createWindowFullSize(0, 0, [text]);
    textWindow.alignCenterMiddle();
    textWindow.alignTextCenter();
    this.addAction(this.commandCreateTextWindow, textWindow);
    return textWindow;
  }

  commandCreateTextWindow(textWindow) {
    this._textWindow = textWindow;
    this.commandAddChild(textWindow);
  }

  createAskWindow(text, yesHandler, noHanlder) {
    const commandYes = CommandWindow.createCommand('Yes', 'YES', yesHandler);
    const commandNo = CommandWindow.createCommand('No', 'NO', noHanlder);
    const askWindow = CommandWindow.create(0, 0, [text], [commandYes, commandNo]);
    askWindow.alignBottom();
    this.addAction(this.commandCreateAskWindow, askWindow);
    return askWindow;
  }

  commandCreateAskWindow(askWindow) {
    this._askWindow = askWindow;
    this.commandAddChild(askWindow);
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
    const x = ScreenHelper.getCenterPosition(CardsetSprite.contentOriginalWidth());
    const y = ScreenHelper.getMiddlePosition(CardsetSprite.contentOriginalHeight());
    const playerHand = CardsetSprite.create(x, y);
    playerHand.show();
    const sprites = playerHand.listCards(cards);
    playerHand.startClosedCards(sprites);

    const disableSprites = sprites.filter((sprite, index) => disableIndexes.includes(index));
    playerHand.disableCards(disableSprites);

    this.addAction(this.commandCreatePlayerHand, playerHand);
    return playerHand;
  }

  commandCreatePlayerHand(playerHand) {
    this._playerHand = playerHand
    this.commandAddChild(playerHand);
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

  commandGetHandSprites(index) {
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

  commandClosePlayerBoardWindow() {
    super.commandClosePlayerBoardWindow();
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

  openPowerfield() {
    this.addAction(this.commandOpenPowerfield);
  }

  commandOpenPowerfield() {
    this._powerfield.openCards();
  }

  createPowerfield(cards) {
    const x = ScreenHelper.getCenterPosition(CardsetSprite.contentOriginalWidth());
    const y = ScreenHelper.getMiddlePosition(CardsetSprite.contentOriginalHeight());
    const powerfield = CardsetSprite.create(x, y);
    powerfield.show();
    const xCard = CardsetSprite.contentOriginalWidth() - CardSprite.contentOriginalWidth();
    const sprites = powerfield.setCards(cards, xCard);
    powerfield.startClosedCards(sprites);
    this.addAction(this.commandCreatePowerfield, powerfield);
    return powerfield;
  }

  commandCreatePowerfield(powerfield) {
    this._powerfield = powerfield;
    this.commandAddChild(powerfield);
  }

  closePowerCard() {
    this.addAction(this.commandClosePowerCard);
  }

  commandClosePowerCard() {
    this._powerfield.closeCards();
  }

  leavePowerCard() {
    this.addAction(this.commandLeavePowerCard);
  }

  commandLeavePowerCard() {
    this.removeChild(this._powerfield);
  }

  leaveBeginLoadPhaseWindow() {
    this.addAction(this.commandLeaveBeginLoadPhaseWindow);
  }

  commandLeaveBeginLoadPhaseWindow() {
    this.removeChild(this._textWindow);
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

  leaveAskWindow() {
    this.addAction(this.commandLeaveAskWindow);
  }

  commandLeaveAskWindow() {
    this.removeChild(this._askWindow);
  }

  start(manager) {
    const title = 'Load Phase';
    const description = 'Select and use a Program Card.';
    this.createTitleWindow(title);
    this.createDescriptionWindow(description);
    this.openTextWindows();
    this.setStep(GameConst.START_PHASE);
  }

  update(manager) {
    super.update();
    if (this.isBusy()) return false;
    this.updateStepStart(manager);
    this.updateStepBeginLoadPhase(manager);
    this.updateStatus(manager);
    this.updateStartPlay(manager);
    this.updateStepChallengeLoadPhase(manager);
    this.updateStepPlayerLoadPhase(manager);
    this.updateStepPowerfieldLoadPhase(manager);
    if (manager.isEndPlays() && manager.getPowerfieldLength()) return; 
    this.updateStepEnd(manager);
  }

  updateStatus(manager) {
    if (this.isCurrentStep(GameConst.ACTIVE_POWER_CARD)) {
      this._status.update(manager);
    }
  }

  updateStepStart(manager) {
    if (this.isCurrentStep(GameConst.START_PHASE) && Input.isTriggered('ok')) {
      this.commandCloseTextWindows();
      this.leaveTextWindows();
      this.createPlayerGameBoard(manager);
      this.createChallengeGameBoard(manager);
      this.openGameBoards();
      const text = 'Begin Load Phase';
      this.createTextWindow(text);
      this.openBeginLoadPhaseWindow();
      this.setStep(GameConst.BEGIN_LOAD_PHASE);
    }
  }

  updateStepBeginLoadPhase(manager) {
    if (this.isCurrentStep(GameConst.BEGIN_LOAD_PHASE) && Input.isTriggered('ok')) {
      this.closeBeginLoadPhaseWindow();
      this.leaveBeginLoadPhaseWindow();
      this.setStep(GameConst.TURN_PHASE);
    }
  }

  updateStartPlay(manager) {
    if (manager.isStartPlays() && this.isCurrentStep(GameConst.TURN_PHASE)) {
      if (manager.startPlay) {
        this.setStep(GameConst.PLAYER_TURN_PHASE);
      } else {
        this.setStep(GameConst.CHALLENGE_TURN_PHASE);
      }
    }
  }

  updateStepChallengeLoadPhase(manager) {
    if (this.isCurrentStep(GameConst.CHALLENGE_TURN_PHASE)) {
      manager.challengePassed();
      this.challengePass();
      this.stepWainting();
      if (manager.isPlayerPassed() === false) this.setStep(GameConst.PLAYER_TURN_PHASE);
    }
  }

  updateStepPlayerLoadPhase(manager) {
    if (this.isCurrentStep(GameConst.PLAYER_TURN_PHASE)) {
      const commandYes = () => {
        this.commandCloseAskWindow();
        this.leaveAskWindow();
        this.closeGameBoards();
        this.leaveGameBoards();
        this.commandPlayerHand(manager);
      };
      const commandNo = () => {
        this.commandCloseAskWindow();
        this.leaveAskWindow();
        this.commandPlayerPassed(manager);
      };
      this.createAskWindow('Use a Program Card?', commandYes, commandNo);
      this.openAskWindow();
      this.stepWainting();
    }
  }

  updateStepPowerfieldLoadPhase(manager) {
    // console.log(manager, manager.isEndPlays(), manager.getPowerfieldLength());
    if (manager.isEndPlays() && manager.getPowerfieldLength()) {
      const { card: powerCard } = manager.getPowerfieldLastCardSlot();
      const cardIndex = manager.getPowerfieldLength() - 1;
      const sprite = this.commandGetPowerfieldSprites(cardIndex);
      this.animateCastPowerCard(sprite, cardIndex);
      this.runPowerCard(manager, powerCard);
      this.setStep(GameConst.ACTIVE_POWER_CARD);
      manager.removePowerfieldLastCardSlot();
    }
  }

  commandGetPowerfieldSprites(index) {
    return this._powerfield.getSprites(index);
  }

  animateCastPowerCard(sprite, cardIndex) {
    // mostrar janela de titulo e descrição do card e espera

    this._powerfield.zoomAllCards(sprite);
    this._powerfield.flashCardsAnimate(sprite, 'white');
    this._powerfield.zoomOutAllCards(sprite);
    this._powerfield.leaveAllCards(sprite);
  }

  runPowerCard(manager, powerCard) {
    this.addAction(this.commandRunPowerCard, manager, powerCard);
  }

  commandRunPowerCard(manager, powerCard) {
    this._status.runPowerCard(manager, powerCard);
  }

  updateStepEnd(manager) {
    const phaseNotFinished = this.isCurrentStep(GameConst.END_PHASE) === false;
    if (manager.isEndPlays() && phaseNotFinished) {
      this.addWait();
      this.closeGameBoards();
      this.leaveGameBoards();
      this.addAction(manager.endPhase);
      this.stepEnd();
    }
  }

  createPlayerGameBoard(manager) {
    const energies = Object.values(manager.getPlayerEnergies());
    const cardsInDeck = manager.getPlayerDeckLength();
    const cardsInHand = manager.getPlayerHandLength();
    const cardsInTrash = manager.getPlayerTrashLength();
    const victories = manager.getPlayerVictories();
    const passed = manager.isPlayerPassed();
    const boardWindow = this.createPlayerBoardWindow(energies, cardsInDeck, cardsInHand, passed);
    const boardWindowHeight = boardWindow.height;
    const battleWindow = this.createPlayerBattleWindow(boardWindowHeight);
    const trashWindow = this.createPlayerTrashWindow(cardsInTrash);
    const scoreWindow = this.createPlayerScoreWindow(victories, boardWindowHeight);
    const battlefield = this.createPlayerBattlefield();
  }

  createChallengeGameBoard(manager) {
    const energies = Object.values(manager.getChallengeEnergies());
    const cardsInDeck = manager.getChallengeDeckLength();
    const cardsInHand = manager.getChallengeHandLength();
    const cardsInTrash = manager.getChallengeTrashLength();
    const victories = manager.getChallengeVictories();
    const passed = manager.isChallengePassed();
    const boardWindow = this.createChallengeBoardWindow(energies, cardsInDeck, cardsInHand, passed);
    const boardWindowHeight = boardWindow.height;
    const battleWindow = this.createChallengeBattleWindow(boardWindowHeight);
    const trashWindow = this.createChallengeTrashWindow(cardsInTrash);
    const scoreWindow = this.createChallengeScoreWindow(victories, boardWindowHeight);
    const battlefield = this.createChallengeBattlefield();
  }

  commandPlayerHand(manager) {
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
      this.createChallengeGameBoard(manager);
      this.openGameBoards();
      const cards = cardIndexs.map(index => manager.getCardPlayerHandByIndex(index));
      this.createPowerfield(cards);
      this.openPowerfield();
      this.activePowerCard(cardIndexs[0], manager, GameConst.PLAYER);
      this.setStep(GameConst.ACTIVE_POWER_CARD);
    };
    const onCancelHandler = () => {
      this.closePlayerHand();
      this.leavePlayerHand();
      this.createPlayerGameBoard(manager);
      this.createChallengeGameBoard(manager);
      this.openGameBoards();
      this.setStep(GameConst.PLAYER_TURN_PHASE);
    };

    const playerEnergies = Object.values(manager.getPlayerEnergies());
    const playerCardsInDeck = manager.getPlayerDeckLength();
    const playerCardsInHand = manager.getPlayerHandLength();
    const playerPassed = manager.isPlayerPassed();
    this.createPlayerBoardWindow(playerEnergies, playerCardsInDeck, playerCardsInHand, playerPassed);
    
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

  activePowerCard(cardIndexHand, manager, player) {
    this.addAction(this.commandActivePowerCard, cardIndexHand, manager, player);
  }

  commandActivePowerCard(cardIndexHand, manager, player) {
    return this._status.activePowerCard(cardIndexHand, manager, player);
  }

  commandPlayerPassed(manager) {
    manager.playerPassed();
    this.playerPass();
    this.stepWainting();
    if (manager.isChallengePassed() === false) this.setStep(GameConst.CHALLENGE_TURN_PHASE);
  }

  isPowerFieldVisible() {
    return this._powerfield.visible;
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

  moveCardToPowerfield(sprites, number, player) {
    this.addAction(this.commandMoveCardToPowerfield, sprites, number, player);
  }

  commandMoveCardToPowerfield(sprites, number, player) {
    this._powerfield.moveAllCardsInlist(sprites);
    this._powerfield.flashCardsAnimate(sprites, 'white');
    this._powerfield.setNumberColor(number, (player === GameConst.PLAYER_1) ? GameColors.BLUE : GameColors.RED);
    this._powerfield.displayReverseOrdering();
    this._powerfield.closeCards(sprites);
    this._powerfield.openCards(sprites);
  }

  waitStatus() {
    this.addAction(this.commandWaitStatus);
  }

  commandWaitStatus() {
    this._status.waitStatus();
  }
}
