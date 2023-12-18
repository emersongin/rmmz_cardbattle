(function() {
'use strict';
class TextWindow extends Window_Base {

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
class StartPhase {
  _manager;

  constructor(manager) {
    this._manager = manager;
  }

  start() {
    console.log('Phase started');
  }

  update() {
    console.log('Phase updated');
  }

}
class CardBattleManager {
  phase;

  static changePhase(phase) {
    CardBattleManager.phase = phase;
  }

  static setup() {
    CardBattleManager.changePhase(new StartPhase(this));
    CardBattleManager.phase.start();
  }

  static update() {
    CardBattleManager.phase.update();
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

