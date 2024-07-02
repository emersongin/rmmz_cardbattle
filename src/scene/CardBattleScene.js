class CardBattleScene extends Scene_Message {
  initialize() {
    super.initialize();
    this._status = null;
    this._containerAnimationSprites = [];
  }

  setStatus(className, ...params) {
    const status = new className(this, ...params);
    if ((status instanceof PhaseSprite) === false) {
      throw new Error('status must be an instance of Phase');
    }
    this._status = status;
    this._status.start();
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
    this.setStatus(PhaseSprite);
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

  addWindow(window) {
    this._windowLayer.addChild(window);
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