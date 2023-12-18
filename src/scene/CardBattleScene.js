
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
    const wh = Graphics.boxHeight;
    return new Rectangle(wx, wy, ww, wh);
  }

  start() {
    super.start();
    CardBattleManager.setup();
  }

  update() {
    CardBattleManager.update();
    super.update();
  }

  stop() {
    super.stop();
  }

  terminate() {
    super.terminate();
  }
}