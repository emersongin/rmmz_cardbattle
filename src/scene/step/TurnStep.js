class TurnStep extends Step {
  _textWindow = {};
  _askWindow = {};
  _startTurn = false;
  _awaitingDecision = false;
  _playerPlayHandler = null; 
  _playerPassedHandler = null; 
  _challengedPlayHandler = null; 
  _challengedPassedHandler = null;

  constructor(
    scene, 
    phase, 
    playerPlayHandler, 
    playerPassedHandler, 
    challengedPlayHandler, 
    challengedPassedHandler,
    finish
  ) {
    const phasesEnabled = [GameConst.LOAD_PHASE];
    if (!phasesEnabled.some(p => p === phase)) {
      throw new Error('Invalid phase for TurnStep.');
    }
    super(scene, phase, finish);
    if (typeof playerPlayHandler !== 'function') {
      throw new Error('Invalid playerPlayHandler for TurnStep.');
    }
    if (typeof playerPassedHandler !== 'function') {
      throw new Error('Invalid playerPassedHandler for TurnStep.');
    }
    if (typeof challengedPlayHandler !== 'function') {
      throw new Error('Invalid challengedPlayHandler for TurnStep.');
    }
    if (typeof challengedPassedHandler !== 'function') {
      throw new Error('Invalid challengedPassedHandler for TurnStep.');
    }
    this._playerPlayHandler = playerPlayHandler;
    this._playerPassedHandler = playerPassedHandler;
    this._challengedPlayHandler = challengedPlayHandler;
    this._challengedPassedHandler = challengedPassedHandler;
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

  updateTurn(manager) {
    if (this.isStarted()) {
      if (this.updateActivePowerfieldByLimit(manager)) return;
      if (this.updatePlayerTurn(manager)) return;
      if (this.updateChallengedTurn(manager)) return;
      if (this.updateActivePowerfield(manager)) return;
      this.addAction(this.finish);
    }
  }

  isStarted() {
    return this._startTurn;
  }

  updateActivePowerfieldByLimit(manager) {
    const limit = 3;
    const isPowerfieldFull = manager.getPowerfieldLength() >= limit;
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
      const commandYes = this.commandPlayerPlay();
      const yesEnabled = manager.isPlayerHasPowerCardInHand();
      const commandNo = this.commandPlayerPasse();
      const text = 'Use a Program Card?';
      this.createAskWindow(text, commandYes, yesEnabled, commandNo);
      this.openAskWindow();
      this._awaitingDecision = true;
      return true;
    } 
  }

  commandPlayerPlay() {
    return () => {
      this.commandCloseAskWindow();
      this.leaveAskWindow();
      this.closeGameBoards();
      this.leaveGameBoards();
      this.addAction(this._playerPlayHandler);
    }
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

  commandPlayerPasse() {
    return () => {
      this.commandCloseAskWindow();
      this.leaveAskWindow();
      this.playerBoardWindowPass();
      this.addAction(this.commandPlayerPassed);
      this.addAction(this.commandDropDecision);
    };
  }

  commandPlayerPassed() {
    this._playerPassedHandler();
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
        this.addAction(this.commandChallengedPlay);
        return true;
      }
      this.commandChallengedPasse();
      return true;
    }
  }

  commandChallengedPlay() {
    this._challengedPlayHandler();
  }

  commandChallengedPasse() {
    this.challengedBoardWindowPass();
    this.addAction(this.commandChallengedPassed);
  }

  commandChallengedPassed() {
    this._challengedPassedHandler();
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

  startTurn() {
    this._startTurn = true;
  }

  isAwaitingDecision() {
    return this._awaitingDecision;
  }
}