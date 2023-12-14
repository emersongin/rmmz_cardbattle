
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