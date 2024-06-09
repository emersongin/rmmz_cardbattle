class LoadPhase extends Phase {
  _textWindow = {};
  _askWindow = {};

  createTextWindow(text) {
    this._textWindow = TextWindow.createWindowFullSize(0, 0, [text]);
    this._textWindow.alignCenterMiddle();
    this._textWindow.alignTextCenter();
    this.attachChildLast(this._textWindow);
  }

  createAskWindow(text, yesHandler, noHanlder) {
    const commandYes = CommandWindow.createCommand('Yes', 'YES', yesHandler);
    const commandNo = CommandWindow.createCommand('No', 'NO', noHanlder);
    this._askWindow = CommandWindow.create(0, 0, [text], [commandYes, commandNo]);
    this._askWindow.alignBottom();
    this.addWindow(this._askWindow);
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

  stepBeginLoadPhase() {
    this.addAction(this.commandChangeStep, GameConst.BEGIN_LOAD_PHASE);
  }

  isStepBeginLoadPhase() {
    return this.isCurrentStep(GameConst.BEGIN_LOAD_PHASE);
  }

  stepPlayerLoadPhase() {
    this.addAction(this.commandChangeStep, GameConst.PLAYER_LOAD_PHASE);
  }

  isStepPlayerLoadPhase() {
    return this.isCurrentStep(GameConst.PLAYER_LOAD_PHASE);
  }

  stepChallengeLoadPhase() {
    this.addAction(this.commandChangeStep, GameConst.CHALLENGE_LOAD_PHASE);
  }

  isStepChallengeLoadPhase() {
    return this.isCurrentStep(GameConst.CHALLENGE_LOAD_PHASE);
  }

  isBusy() {
    const children = [
      this._textWindow
    ];
    return super.isBusy() || children.some(obj => (obj.isBusy ? obj.isBusy() : false));
  }

  getTextWindow() {
    return this._textWindow;
  }
}
