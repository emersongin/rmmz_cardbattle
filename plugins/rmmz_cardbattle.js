(function() {
'use strict';
class TextWindow extends Window_Base {
  constructor(rect) {
    super(rect);
    this.initClosed();
    this.drawText('text', 0, 0, 320, 'left');
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

