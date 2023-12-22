
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
    this.addWindowChanllengerText();
  }

  addWindowChanllengerText() {
    this._textWindow.clearTextContent();
    this._textWindow.addText('Hello, World!');
    this._textWindow.addText('Hello, Planet!');
    this._textWindow.addText('Hello, Solar System!');
    this._textWindow.addText('Hello, Galaxy!');
    this._textWindow.addText('Hello, Universe!');
    this._textWindow.addText('Hello, Multiverse!');
    this._textWindow.addText('Hello, Parallel Universe!');
    this._textWindow.addText('Hello, Dimension!');
    this._textWindow.addText('Hello, Space!');
    this._textWindow.addText('Hello, Time!');
    this._textWindow.addText('Hello, Infinity!');
    this._textWindow.addText('Hello, Eternity!');
    this._textWindow.addText('Hello, Nothing!');
    this._textWindow.addText('Hello, Void!');
    this._textWindow.drawTextContent();
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