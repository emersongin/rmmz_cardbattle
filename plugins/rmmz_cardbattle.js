(function() {
'use strict';
class TextWindow extends Window_Base {

}

class CardBattleScene extends Scene_Message {
  _manager = null;
  _textWindow = null;

  constructor(cardbattleManager) {
    super();
    this._manager = cardbattleManager;
  }

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
    this._manager.setup();
  }

  update() {
    super.update();
    CardBattleManager.update();
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

  updateStart() {
    // this._manager.changePhase(new DrawPhase(this._manager));
    console.log('StartPhase');
  }

}
class CardBattleManager {
  phase;

  static changePhase(phase) {
    CardBattleManager.phase = phase;
  }

  static setup() {
    CardBattleManager.changePhase(new StartPhase(this));
  }

  static update() {
    CardBattleManager.phase.updateStart();
  }
}

SceneManager.goto = function(sceneClass, params = []) {
  if (sceneClass) {
    this._nextScene = new sceneClass(...params);
  }
  if (this._scene) {
    this._scene.stop();
  }
};

Scene_Boot.prototype.start = function() {
  Scene_Base.prototype.start.call(this);
  SoundManager.preloadImportantSounds();
  DataManager.setupNewGame();
  SceneManager.goto(CardBattleScene, [CardBattleManager]);
  this.resizeScreen();
  this.updateDocumentTitle();
};
})();

