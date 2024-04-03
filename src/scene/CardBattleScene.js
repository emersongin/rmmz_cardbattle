class CardBattleScene extends Scene_Message {
  initialize() {
    super.initialize();
    this._phase = null;
  }

  create() {
    super.create();
    this.createDisplayObjects();
    this.loadAssets();
  }

  createDisplayObjects() {
    this.createWindowLayer();
  }

  loadAssets() {
    ImageManager.loadCard('default');
  }

  start() {
    super.start();
    this.changePhase(OpenCardSpriteTest);
  }

  update() {
    if (this.isActive()) {
      if (this._phase) this._phase.update();
    }
    super.update();
  }

  changePhase(phase) {
    this._phase = new phase(this);
  }

  isActive() {
    return !this.isBusy();
  }

  isBusy() {
    return super.isBusy();
  };

  stop() {
    super.stop();
  }

  terminate() {
    super.terminate();
  }

  removeWindow(window) {
    this._windowLayer.removeChild(window);
  };

}