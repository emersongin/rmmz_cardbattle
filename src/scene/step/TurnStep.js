class TurnStep extends Step {
  _startTurn = false;
  _awaitingDecision = false;
  _textWindow = {};
  _askWindow = {};

  constructor(scene, phase, finish) {
    const phasesEnabled = [GameConst.LOAD_PHASE];
    if (!phasesEnabled.some(p => p === phase)) {
      throw new Error('Invalid phase for TurnStep.');
    }
    super(scene, phase, finish);
  }

  start(manager, text = 'Begin Load Phase') {
    this.createPlayerGameBoard(manager);
    this.createChallengedGameBoard(manager);
    this.openGameBoards();
    this.createTextWindow(text);
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

  update(manager) {
    super.update();
    if (this.isBusy() || this.hasActions() || this.isAwaitingDecision()) return false;
    this.updateStartTurn();
    this.updateTurn(manager);
  }

  updateStartTurn() {
    if (this.isReady() && Input.isTriggered('ok')) {
      this.closeTextWindow();
      this.leaveTextWindow();
      this.addAction(this.startTurn);
    }
  }

  startTurn() {
    this._startTurn = true;
  }

  isReady() {
    return this._startTurn === false;
  }

  isStarted() {
    return this._startTurn;
  }

  updateTurn(manager) {
    if (this.isStarted()) {
      if (this.updateActivePowerfieldByLimit(manager)) return;
      if (this.updatePlayerTurn(manager)) return;
      if (this.updateChallengedTurn(manager)) return;
      if (this.updateActivePowerfield(manager)) return;
      this.addAction(this.finish);
    }
  }

  updateActivePowerfieldByLimit(manager) {
    const isPowerfieldFull = manager.getPowerfieldLength() >= 3;
    if (isPowerfieldFull) {
      this.addAction(this.commandActivePowerfield);
      return true;
    }
  }

  commandActivePowerfield() {
    this.changeStep(RunPowerfieldStep);
    if (typeof this._finish === 'function') return this._finish();
    this.destroy();
  }

  updatePlayerTurn(manager) {
    const startPlay = manager.isPlayerStartTurn();
    if ((startPlay || manager.isChallengedPassed()) && manager.isPlayerPassed() === false) {
      const commandYes = () => {
        this.commandPlayerSelectHandPlay(manager);
      };
      const commandNo = () => {
        this.commandPlayerSelectPasse(manager);
      };
      this.createAskWindow('Use a Program Card?', commandYes, commandNo);
      this.openAskWindow();
      this._awaitingDecision = true;
      return true;
    } 
  }

  commandPlayerSelectHandPlay(manager) {
    this.commandCloseAskWindow();
    this.leaveAskWindow();
    this.closeGameBoards();
    this.leaveGameBoards();
    this.addAction(this.commandPlayerHand, manager);
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

  commandPlayerHand(manager) {
    const config = {
      player: GameConst.PLAYER,
      blockBattleCards: true,
      blockPowerCardsInLoadPhase: true,
    };
    this.changeStep(HandStep, config);
    if (typeof this._finish === 'function') return this._finish();
    this.destroy();
  }

  commandPlayerSelectPasse(manager) {
    this.commandCloseAskWindow();
    this.leaveAskWindow();
    this.playerBoardWindowPass();
    this.addAction(this.commandPlayerPassed, manager);
    this.addAction(this.commandDropDecision);
  }

  commandPlayerPassed(manager) {
    manager.playerPassed();
  }

  commandDropDecision() {
    this._awaitingDecision = false;
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

  openAskWindow() {
    this.addAction(this.commandOpenAskWindow);
  }

  commandOpenAskWindow() {
    this._askWindow.open();
  }

  updateChallengedTurn(manager) {
    if (manager.isChallengedPassed() === false) {
      if (manager.isChallengedHasPowerCardInHand()) {
        this.addAction(this.commandChallengedActivePowerCard);
        return true;
      }
      this.commandChallengedSelectPasse(manager);
      return true;
    }
  }

  commandChallengedActivePowerCard() {
    this.changeStep(ActivatePowerCardStep);
    if (typeof this._finish === 'function') return this._finish();
    this.destroy();
  }

  commandChallengedSelectPasse(manager) {
    this.challengedBoardWindowPass();
    this.addAction(this.commandChallengedPassed, manager);
  }

  commandChallengedPassed(manager) {
    manager.challengedPassed();
  }

  updateActivePowerfield(manager) {
    if (manager.getPowerfieldLength() > 0) {
      this.commandActivePowerfield();
      return true;
    }
  }

  finish() {
    const phase = this.getPhase();
    switch (phase) {
      case GameConst.LOAD_PHASE:
        break;
      default:
        break;
    }
    if (typeof this._finish === 'function') return this._finish();
  }

  isBusy() {
    const children = [
      this._textWindow,
      this._askWindow,
    ];
    return super.isBusy() || children.some(obj => (obj?.isBusy ? obj.isBusy() : false));
  }

  isAwaitingDecision() {
    return this._awaitingDecision;
  }
}