class TurnStep extends Step {
  _textWindow = undefined;
  _askWindow = undefined;
  _startTurn = false;
  _awaitingDecision = false;
  _playerPlayHandler = () => {}; 
  _playerPassedHandler = () => {}; 
  _challengedPlayHandler = () => {}; 
  _challengedPassedHandler = () => {};
  _activePowerfieldHandler = () => {};

  constructor(
    scene, 
    phase, 
    handlers,
    finish
  ) {
    const phasesEnabled = [GameConst.LOAD_PHASE];
    if (!phasesEnabled.some(p => p === phase)) {
      throw new Error('Invalid phase for TurnStep.');
    }
    super(scene, phase, finish);
    if (!handlers.playerPlayHandler || typeof handlers.playerPlayHandler !== 'function') {
      throw new Error('Invalid playerPlayHandler for TurnStep.');
    }
    if (!handlers.playerPassedHandler || typeof handlers.playerPassedHandler !== 'function') {
      throw new Error('Invalid playerPassedHandler for TurnStep.');
    }
    if (!handlers.challengedPlayHandler || typeof handlers.challengedPlayHandler !== 'function') {
      throw new Error('Invalid challengedPlayHandler for TurnStep.');
    }
    if (!handlers.challengedPassedHandler || typeof handlers.challengedPassedHandler !== 'function') {
      throw new Error('Invalid challengedPassedHandler for TurnStep.');
    }
    if (!handlers.activePowerfieldHandler || typeof handlers.activePowerfieldHandler !== 'function') {
      throw new Error('Invalid activePowerfieldHandler for TurnStep.');
    }
    this._playerPlayHandler = handlers?.playerPlayHandler;
    this._playerPassedHandler = handlers?.playerPassedHandler;
    this._challengedPlayHandler = handlers?.challengedPlayHandler;
    this._challengedPassedHandler = handlers?.challengedPassedHandler;
    this._activePowerfieldHandler = handlers?.activePowerfieldHandler;
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

  updateTurn(manager) {
    if (this.isStarted()) {
      if (this.updateActivePowerfieldByLimit(manager)) return;
      if (this.updatePlayerTurn(manager)) return;
      if (this.updateChallengedTurn(manager)) return;
      if (this.updateActivePowerfield(manager)) return;
      this.endTurn();
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
    this._activePowerfieldHandler();
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
      this.addAction(this.commandActivePowerfield);
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
    this.end();
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
}