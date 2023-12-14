(function() {
'use strict';
class CardBattleManager {
  constructor() {
    throw new Error('This is a static class');
  }

  static init() {
    console.log('manager init!');
  }
}

class SceneCardBattle extends Scene_Message {
  _manager = null;

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
    super.createAllWindows();
  };

  start() {
    super.start();
    this._manager.init();
  }

  update() {
    super.update();
  }

  stop() {
    super.stop();
  }

  terminate() {
    super.terminate();
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
  SceneManager.goto(SceneCardBattle, [CardBattleManager]);
  this.resizeScreen();
  this.updateDocumentTitle();
};
})();

