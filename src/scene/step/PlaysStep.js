class PlaysStep extends Step {
  _textWindow = {};

  start(manager) {
    const phase = this.getPhase();
    this.createPlayerGameBoard(manager);
    this.createChallengeGameBoard(manager);
    this.openGameBoards();
    const text = 'Begin Load Phase';
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

  update(manager) {
    super.update();
    if (this.isBusy()) return false;
    if (Input.isTriggered('ok')) {
      const phase = this.getPhase();
      this.closeGameBoards();
      this.leaveGameBoards();
      // this.addAction(this.finish, phase);
    }
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
    ];
    return super.isBusy() || children.some(obj => (obj.isBusy ? obj.isBusy() : false));
  }
}