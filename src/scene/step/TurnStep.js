class TurnStep extends Step {
  _textWindow = undefined;
  _askWindow = undefined;
  _startTurn = false;
  _awaitingDecision = false;

  constructor(scene, phase) {
    const phasesEnabled = [GameConst.LOAD_PHASE];
    if (!phasesEnabled.some(p => p === phase)) {
      throw new Error('Invalid phase for TurnStep.');
    }
    super(scene, phase);
  }

  start(text = 'Begin Load Phase') {
    this.createGameBoards();
    this.createTextWindow(text);
    this.openGameBoards();
    this.openTextWindow();
  }

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

  openTextWindow() {
    this.addAction(this.commandOpenTextWindow);
  }

  commandOpenTextWindow() {
    this._textWindow.open();
  }

  update() {
    super.update();
    if (this.isBusy() || this.hasActions() || this.isAwaitingDecision()) return false;
    this.updateStartTurn();
    this.updateTurn();
  }

  isAwaitingDecision() {
    return this._awaitingDecision;
  }

  updateStartTurn() {
    if (this.isReady() && Input.isTriggered('ok')) {
      this.closeTextWindow();
      this.leaveTextWindow();
      this.addAction(this.startTurn);
    }
  }

  isReady() {
    return this._startTurn === false;
  }

  closeTextWindow() {
    this.addAction(this.commandCloseTextWindow);
  }

  commandCloseTextWindow() {
    this._textWindow.close();
  }

  leaveTextWindow() {
    this.addAction(this.commandLeaveBeginLoadPhaseWindow);
  }

  commandLeaveBeginLoadPhaseWindow() {
    this.removeChild(this._textWindow);
  }

  startTurn() {
    this._startTurn = true;
  }

  updateTurn() {
    if (this.isStarted()) {
      if (this.updateActivePowerfieldByLimit()) return;
      if (this.updatePlayerTurn()) return;
      if (this.updateChallengedTurn()) return;
      if (this.updateActivePowerfield()) return;
      this.endTurn();
    }
  }

  isStarted() {
    return this._startTurn;
  }

  updateActivePowerfieldByLimit() {
    const limit = 3;
    const isPowerfieldFull = CardBattleManager.getPowerfieldLength() >= limit;
    if (isPowerfieldFull) {
      this.addAction(this.commandActivePowerZone);
      return true;
    }
  }

  commandActivePowerZone() {
    this.changeStep(PowerZoneStep);
  }

  updatePlayerTurn() {
    const startPlay = CardBattleManager.isPlayerStartTurn();
    if ((startPlay || CardBattleManager.isChallengedPassed()) && CardBattleManager.isPlayerWaiting()) {
      const yesCommand = this.getPlayerPlayCommand();
      const yesEnabled = CardBattleManager.isPlayerHasPowerCardInHand();
      const noCommand = this.getPlayerPasseCommand();
      const text = 'Use a Program Card?';
      this.createAskWindow(text, yesCommand, yesEnabled, noCommand);
      this.openAskWindow();
      this._awaitingDecision = true;
      return true;
    }
  }

  getPlayerPlayCommand() {
    return () => {
      this.commandCloseAskWindow();
      this.leaveAskWindow();
      this.closeGameBoards();
      this.leaveGameBoards();
      this.addAction(this.commandPlayerPlay);
    }
  }

  commandPlayerPlay() {
    const config = {
      location: GameConst.HAND,
      player: GameConst.PLAYER,
      blockBattleCards: true,
      blockPowerCardsInLoadPhase: true,
    };
    const handlers = {
      goBackHandler: () => {},
      selectHandler: () => {},
      moveCursorHandler: () => {},
    };
    this.changeStep(ZoneStep, config, handlers);
  }

  commandCloseAskWindow() {
    this._askWindow.close();
  }

  leaveAskWindow() {
    this.addAction(this.commandLeaveAskWindow);
  }

  commandLeaveAskWindow() {
    this.removeChild(this._askWindow);
  }

  getPlayerPasseCommand() {
    return () => {
      this.commandCloseAskWindow();
      this.leaveAskWindow();
      this.playerBoardWindowPass();
      this.addAction(this.commandPlayerPassed);
      this.addAction(this.commandDropDecision);
    };
  }

  commandPlayerPassed() {
    CardBattleManager.playerPassed();
  }

  commandDropDecision() {
    this._awaitingDecision = false;
  }

  createAskWindow(text, yesHandler, yesEnabled, noHanlder) {
    const commandYes = CommandWindow.createCommand('Yes', 'YES', yesHandler, yesEnabled);
    const commandNo = CommandWindow.createCommand('No', 'NO', noHanlder);
    const askWindow = CommandWindow.create(0, 0, [text], [commandYes, commandNo]);
    askWindow.alignBottom();
    this.addAction(this.commandCreateAskWindow, askWindow);
    return askWindow;
  }

  commandCreateAskWindow(askWindow) {
    this._askWindow = askWindow;
    this.commandAddChildToFront(askWindow);
  }

  openAskWindow() {
    this.addAction(this.commandOpenAskWindow);
  }

  commandOpenAskWindow() {
    this._askWindow.open();
  }

  updateChallengedTurn() {
    if (CardBattleManager.isChallengedWaiting()) {
      if (CardBattleManager.isChallengedHasPowerCardInHand()) {
        this.addAction(this.commandChallengedPlay);
        return true;
      }
      this.commandChallengedPasse();
      return true;
    }
  }

  commandChallengedPlay() {
    // aqui provavelmente será a mudança de estado para jogada do 
    // desafiado e o final dela será a etapa de ativação de slot
    const powerConfig = { cardIndex: 0, player: GameConst.CHALLENGED };
    this.changeStep(ActivationSlotStep, powerConfig);
  }

  commandChallengedPasse() {
    this.challengedBoardWindowPass();
    this.addAction(this.commandChallengedPassed);
  }

  commandChallengedPassed() {
    CardBattleManager.challengedPassed();
  }

  updateActivePowerfield() {
    if (CardBattleManager.getPowerfieldLength() > 0) {
      this.addAction(this.commandActivePowerZone);
      return true;
    }
  }

  endTurn() { 
    this.closeGameBoards();
    this.leaveGameBoards();
    this.addAction(this.commandFinish);
  }

  commandFinish() {
    const phase = this.getPhase();
    switch (phase) {
      case GameConst.LOAD_PHASE:
        this.changePhase(GameConst.SUMMON_PHASE);
        this.changeStep(DisplayStep);
        break;
      default:
        break;
    }
  }

  isBusy() {
    const children = [
      this._textWindow,
      this._askWindow,
    ];
    return super.isBusy() || children.some(obj => (obj?.isBusy ? obj.isBusy() : false));
  }

  selectAskWindowOption(index, askWindow = this._askWindow) {
    askWindow.select(index);
    askWindow.callOkHandler();
  }

  isTextWindowVisible() {
    return this._textWindow?.visible;
  }

  isTextWindowText(text) {
    return this._textWindow.isTextWasDrawn('TEXT_0', text);
  }

  isAskWindowVisible() {
    return this._askWindow?.visible;
  }

  getPlayerInActivationSlotStep() {
    return this._scene.getStep()?.getPlayer();
  }
}