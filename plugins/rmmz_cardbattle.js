(function() {
'use strict';
class TextWindow extends Window_Base {
  _text = [];

  constructor(rect) {
    super(rect);
    this.initClosed();
  }

  addText(text) {
    if (!text) return this._text.push('\n');
    this._text.push(text);
  }

  clearTextContent() {
    this._text = [];
  }

  drawTextContent() {
    if (this._text.length) {
      const textContent = this.processTextContent();
      this.drawTextEx(textContent, 0, 0, this._width);
      this.refreshSize();
    }
  }

  processTextContent() {
    let content = [];
    this._text.forEach((text, index) => {
      if (index) content.push('\n');
      content.push(text);
    });
    return content.join('');
  }

  refreshSize() {
    this.move(this.x, this.y, this._width, this.calculeHeight());
  }

  calculeHeight() {
    return this.fittingHeight(this._text.length);
  }

  initClosed() {
    this._openness = 0;
  }
}
class ChallengerPhase {
  _manager;

  constructor(manager) {
    this._manager = manager;
  }

  update() {
    if (Input.isTriggered('ok')) {
      this._manager.changePhase(new StartPhase(this._manager));
    }
  }
}
class StartPhase {
  _manager;

  constructor(manager) {
    this._manager = manager;
    console.log('Start phase started');
  }

  update() {
    console.log('Start phase updated');
  }

}

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
class CardBattleManager {
  phase;

  static changePhase(phase) {
    CardBattleManager.phase = phase;
  }

  static setup() {
    CardBattleManager.changePhase(new ChallengerPhase(this));
  }

  static update() {
    CardBattleManager.phase.update();
  }

  static isChallengerPhase() {
    return CardBattleManager.phase instanceof ChallengerPhase;
  }

  static isStartPhase() {
    return CardBattleManager.phase instanceof StartPhase;
  }
}

Scene_Boot.prototype.start = function() {
  Scene_Base.prototype.start.call(this);
  SoundManager.preloadImportantSounds();
  DataManager.setupNewGame();
  SceneManager.goto(CardBattleScene);
  this.resizeScreen();
  this.updateDocumentTitle();
};
})();

