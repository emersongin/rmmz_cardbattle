class TurnStep extends Step {
  _isStartTurn = false;
  _textWindow = {};
  _askWindow = {};

  start(manager, text = 'Begin Load Phase') {
    const phase = this.getPhase();
    this.createPlayerGameBoard(manager);
    this.createChallengedGameBoard(manager);
    this.openGameBoards();
    this.createTextWindow(text);
    this.openBeginLoadPhaseWindow();
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

  openBeginLoadPhaseWindow() {
    this.addAction(this.commandOpenTextWindow);
  }

  commandOpenTextWindow() {
    this._textWindow.open();
  }

  closeBeginLoadPhaseWindow() {
    this.addAction(this.commandCloseTextWindow);
  }

  commandCloseTextWindow() {
    this._textWindow.close();
  }

  leaveBeginLoadPhaseWindow() {
    this.addAction(this.commandLeaveBeginLoadPhaseWindow);
  }

  commandLeaveBeginLoadPhaseWindow() {
    this.removeChild(this._textWindow);
  }

  update(manager) {
    super.update();
    if (this.isBusy()) return false;
    this.updateStartTurn();
    this.updateTurn(manager);
  }

  updateStartTurn() {
    if (this._isStartTurn === false && Input.isTriggered('ok')) {
      this.closeBeginLoadPhaseWindow();
      this.leaveBeginLoadPhaseWindow();
      this.addAction(this.startTurn);
    }
  }

  startTurn() {
    this._isStartTurn = true;
  }

  updateTurn(manager) {
    const phase = this.getPhase();
    const startPlay = manager.isPlayerStartTurn();
    if (this._isStartTurn) {
      if ((startPlay || manager.isChallengedPassed()) && manager.isPlayerPassed() === false) {

        // const commandYes = () => {
        //   this.commandCloseAskWindow();
        //   this.leaveAskWindow();
        //   this.closeGameBoards();
        //   this.leaveGameBoards();
        //   this.commandPlayerHand(manager);
        // };
        // const commandNo = () => {
        //   this.commandCloseAskWindow();
        //   this.leaveAskWindow();
          this.playerBoardWindowPass();
          this.addAction(this.commandPlayerPassed, manager);
        // };
        // this.createAskWindow('Use a Program Card?', commandYes, commandNo);
        // this.openAskWindow();

        return;
      } 
      if (manager.isChallengedPassed() === false) {
        this.challengedBoardWindowPass();
        this.addAction(this.commandChallengedPassed, manager);
        return;
      }
      this.addAction(this.finish, phase);
    }
  }

  commandChallengedPassed(manager) {
    manager.challengedPassed();
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
    console.log('hand');
  }

  commandPlayerPassed(manager) {
    this.playerBoardWindowPass();
    manager.playerPassed();
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
      this._textWindow,
      this._askWindow,
    ];
    return super.isBusy() || children.some(obj => (obj.isBusy ? obj.isBusy() : false));
  }
}