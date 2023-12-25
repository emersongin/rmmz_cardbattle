class StartBattleTransition extends Sprite {
  initialize() {
    super.initialize();
    this._started = false;
    this._backgroundBitmap = null;
    this._backgroundLayer = null;
    this._blackLeftSideLayer = null;
    this._blackRightSideLayer = null;
    this.createBackgroundSprite();
    this.createBlackSideLayers();
    this.setupTransition();
  }

  createBackgroundSprite() {
    this._backgroundLayer = new Sprite();
    this._backgroundBitmap = ImageManager.loadParallax('Mountains1');
    this._backgroundLayer.bitmap = this._backgroundBitmap;
    this.addChild(this._backgroundLayer);
  }

  createBlackSideLayers() { 
    this._blackLeftSideLayer = new Sprite();
    this._blackLeftSideLayer.bitmap = this.createScreenBlackBitmap();
    this.addChild(this._blackLeftSideLayer);
    this._blackRightSideLayer = new Sprite();
    this._blackRightSideLayer.bitmap = this.createScreenBlackBitmap();
    this.addChild(this._blackRightSideLayer);
  }

  createScreenBlackBitmap() {
    const bitmap = new Bitmap(Graphics.width, Graphics.height);
    bitmap.fillRect(0, 0, Graphics.width, Graphics.height, 'black');
    return bitmap;
  }

  setupTransition() {
    this._blackLeftSideLayer.x = -Graphics.width;
    this._blackRightSideLayer.x = Graphics.width;
    this._blackLeftSideLayer.target = {
      x: 0, y: 0,
      interval: this.calculateInterval(-Graphics.width, 0, 1)
    };
    this._blackRightSideLayer.target = {
      x: 0, y: 0,
      interval: this.calculateInterval(Graphics.width, 0, 1)
    }
    this._started = true;
  }

  update() {
    super.update();
    if (this._started) {
      this.updateTransition();
      if (!this.isBusy()) this._started = false;
    }
  }

  updateTransition() {
    this.updateLayerTransition(this._blackLeftSideLayer)
    this.updateLayerTransition(this._blackRightSideLayer);
  }

  updateLayerTransition(layer) {
    const { x, target } = layer;
    const { x: targetX } = target;
    if(targetX == x) return; 
    this.moveLayer(layer);
  }

  moveLayer(layer) {
    const { x, target } = layer;
    const { x: targetX, interval } = target;
    if (targetX > x) {
      layer.move(x + interval, 0);
      if (!(targetX > layer.x)) layer.x = targetX;
    } else if (targetX < x) {
      layer.move(x - interval, 0);
      if (!(targetX < layer.x)) layer.x = targetX;
    }
  }

  isMoving(layer) {
    const { x, y, target } = layer;
    const { x: targetX, y: targetY } = target;
    return x != targetX || y != targetY;
  }

  isBusy() {
    return this.isMoving(this._blackLeftSideLayer) || 
      this.isMoving(this._blackRightSideLayer);
  }

  calculateInterval(origin, target, speedPerSecond) {
    return Math.abs(origin - target) / (speedPerSecond * 60);
  }
}