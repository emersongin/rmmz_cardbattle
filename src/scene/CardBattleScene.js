
class CardBattleScene extends Scene_Message {
  _textWindow = null;

  create() {
    super.create();
    this.createDisplayObjects();
  }

  createDisplayObjects() {
    this.createWindowLayer();
    this.createAllWindows();
  };

  createAllWindows() {
    this.createTextWindow();
    super.createAllWindows();
  };

  createTextWindow() {
    const rect = this.textWindowRect();
    this._textWindow = new TextWindow(rect);
    this.addWindow(this._textWindow);
  }

  textWindowRect() {
    const wx = 0;
    const wy = 0;
    const ww = Graphics.boxWidth;
    const wh = Graphics.boxHeight / 4;
    return new Rectangle(wx, wy, ww, wh);
  }

  start() {
    super.start();
    CardBattleManager.setup();
  }

  update() {
    this.updateWindows();
    CardBattleManager.update();
    super.update();
  }

  updateWindows() {
    if (CardBattleManager.isChallengerPhase()) {
      if (this._textWindow.isClosed()) this._textWindow.open();
    } else {
      if (this._textWindow.isOpen()) this._textWindow.close();
    }
  }

  stop() {
    super.stop();
  }

  terminate() {
    super.terminate();
  }
}