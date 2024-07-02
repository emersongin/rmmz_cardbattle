class CardBattleScene extends Scene_Message {
  _containerAnimationSprites = [];

  initialize() {
    super.initialize();
    this._status = null;
  }

  setStatus(status, ...params) {
    this._status = new status(this, ...params);
  }

  create() {
    super.create();
    this.createDisplayObjects();
  }

  createDisplayObjects() {
    this.createWindowLayer();
  }

  start() {
    super.start();
  }

  update() {
    super.update();
    if (this.isActive() && this._status) this._status.update();
  }

  isActive() {
    return !this.isBusy();
  }

  isBusy() {
    return super.isBusy();
  }

  stop() {
    super.stop();
  }

  terminate() {
    super.terminate();
  }

  removeWindow(window) {
    this._windowLayer.removeChild(window);
  };

  addAnimationSprite(sprite) {
    this._containerAnimationSprites.push(sprite);
  }

  getLastAnimationSprite() {
    return this._containerAnimationSprites[this.getLastAnimationSpritesIndex()];
  }

  getLastAnimationSpritesIndex() {
    return this._containerAnimationSprites.length - 1;
  }
}