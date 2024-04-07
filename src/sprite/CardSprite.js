// include ./state/CardSpriteStoppedState.js
// include ./state/CardSpriteMovingState.js
// include ./state/CardSpriteOpeningState.js
// include ./state/CardSpriteZoomState.js
// include ./behavior/CardSpriteAnimatedBehavior.js
// include ./behavior/CardSpriteFlashedBehavior.js
// include ./behavior/CardSpriteSelectedBehavior.js
// include ./behavior/CardSpriteHoveredBehavior.js
// include ./behavior/CardSpriteUpdatedBehavior.js

class CardSprite extends ActionSprite {
  initialize() {
    super.initialize();
    this._type = 0;
    this._color = 0;
    this._figure = {};
    this._backImage = {};
    this._status = {};
    this._behaviors = [];
    this._turned = true;
    this._disabled = false;
    this._attackPoints = 0;
    this._healthPoints = 0;
    this._contentLayer = {};
    this._disabledLayer = {};
    this._flashedLayer = {};
    this._hoveredLayer = {};
    this._selectedLayer = {};
    this.setup();
  }

  setup() {
    this.setSize();
    this.createLayers();
    this.hide();
    this.stop();
  }

  setSize() {
    this.width = this.cardOriginalWidth();
    this.height = this.cardOriginalHeight();
  }

  cardOriginalWidth() {
    return 96;
  }

  cardOriginalHeight() {
    return 128;
  }

  createLayers() {
    this.createContentLayer();
    this.createSelectedLayer();
    this.createHoveredLayer();
  }

  createContentLayer() {
    this._contentLayer = new Sprite();
    this._contentLayer.bitmap = new Bitmap(this.cardOriginalWidth(), this.cardOriginalHeight());
    this.createDisableLayer();
    this.createFlashLayer();
    this.addChild(this._contentLayer);
  }

  createDisableLayer() {
    this._disabledLayer = new Sprite();
    this._disabledLayer.visible = false;
    this._disabledLayer.opacity = 128;
    this._disabledLayer.bitmap = new Bitmap(this.cardOriginalWidth(), this.cardOriginalHeight());
    this._disabledLayer.bitmap.fillAll('black');
    this._contentLayer.addChild(this._disabledLayer);
  }

  createFlashLayer() {
    this._flashedLayer = new Sprite();
    this._flashedLayer.bitmap = new Bitmap(this.cardOriginalWidth(), this.cardOriginalHeight());
    this._contentLayer.addChild(this._flashedLayer);
  }

  createHoveredLayer() {
    this._hoveredLayer = new Sprite();
    this._hoveredLayer.bitmap = new Bitmap(this.cardOriginalWidth(), this.cardOriginalHeight());
    this.addChild(this._hoveredLayer);
  }

  createSelectedLayer() {
    this._selectedLayer = new Sprite();
    this._selectedLayer.bitmap = new Bitmap(this.cardOriginalWidth(), this.cardOriginalHeight());
    this.addChild(this._selectedLayer);
  }

  enable() {
    this._disabled = false;
    this._disabledLayer.visible = false;
    this.refresh();
  }

  hide() {
    this.visible = false;
  }

  stop() {
    this.changeStatus(CardSpriteStoppedState);
  }

  changeStatus(status, ...params) {
    this._status = new status(this, ...params);
  }

  update() {
    if (this.hasActions() && (this.isStopped())) this.executeAction();
    if (this.isMoving() && this.isHidden()) this.show();
    if (this.isVisible()) {
      this.updateStates();
      this.updateBehaviors();
    }
    super.update();
  }

  isStopped() {
    return this.getStatus() instanceof CardSpriteStoppedState;
  }

  getStatus() {
    return this._status;
  }

  isMoving() {
    return this.getStatus() instanceof CardSpriteMovingState;
  }

  isHidden() {
    return !this.isVisible();
  }

  isVisible() {
    return this.visible;
  }

  show() {
    this.visible = true;
    this.refresh();
  }

  refresh() {
    this.drawCard();
  }

  drawCard() {
    this.clearContent();
    if (this.isTurnedToUp()) {
      this.drawCardBackground();
      this.drawCardFigure();
      this.drawCardDisplay();
    } else {
      this.drawCardBack();
    }
    if (this.isDisabled()) {
      this._contentLayer.setColorTone([0, 0, 0, 255]);
    } else {
      this._contentLayer.setColorTone([0, 0, 0, 0]);
    }
  }

  clearContent() {
    this._contentLayer.bitmap.clear();
  }

  isTurnedToUp() {
    return this._turned;
  }

  drawCardBackground() {
    const xPosition = 0;
    const yPosition = 0;
    const color = this.getBackgroundColor();
    this._contentLayer.bitmap.fillRect(xPosition, yPosition, this.width, this.height, color);
  }

  getBackgroundColor() {
    switch (this._color) {
      case CardColors.RED:
        return '#ff0000';
        break;
      case CardColors.GREEN:
        return '#00ff00';
        break;
      case CardColors.BLUE:
        return '#0000ff';
        break;
      case CardColors.WHITE:
        return '#ffffff';
        break;
      case CardColors.BLACK:
        return '#000000';
        break;
      default:
        return brown = '#a52a2a';
        break;
    }
  }

  drawCardFigure() {
    const contentX = 4;
    const contentY = 4;
    const contentWidth = this.cardOriginalWidth() - 8;
    const contentHeight = this.cardOriginalHeight() - 28;
    const openWidthPercent = Math.floor((this.width / this.cardOriginalWidth()) * 100);
    const openHeightPercent = Math.floor((this.height / this.cardOriginalHeight()) * 100);
    const openWidth = Math.floor((contentWidth * openWidthPercent) / 100);
    const openHeight = Math.floor((contentHeight * openHeightPercent) / 100);
    const figureX = 0;
    const figureY = 0;
    const figureWidth = openWidth ? this._figure.width : 0;
    const figureHeight = openHeight ? this._figure.height : 0;
    this._contentLayer.bitmap.blt(
      this._figure, 
      figureX, 
      figureY, 
      figureWidth, 
      figureHeight,
      contentX,
      contentY,
      openWidth,
      openHeight
    );
  }

  drawCardDisplay() {
    switch (this._type) {
      case CardTypes.BATTLE:
          this.drawPoints();
        break;
      case CardTypes.POWER:
        this.drawPowerCaption();
        break;
      default:
        this._contentLayer.bitmap.drawText(
          '???', 
          this.displayXPosition(), 
          this.displayYPosition(), 
          this.displayWidth(), 
          this.displayHeight(), 
          'center'
        );
        break;
    }
  }

  drawPoints() {
    const attack = this._attackPoints.toString().padStart(2, ' ');
    const health = this._healthPoints.toString().padStart(2, ' ');
    const points = `${attack} / ${health}`;
    this._contentLayer.bitmap.drawText(
      points, 
      this.displayXPosition(), 
      this.displayYPosition(), 
      this.displayWidth(), 
      this.displayHeight(),
      'center'
    );
  }

  displayXPosition() {
    return 0;
  }

  displayYPosition() {
    return this.height - 24;
  }

  displayWidth() {
    return this.width;
  }

  displayHeight() {
    return 20;
  }

  drawPowerCaption() {
    this._contentLayer.bitmap.drawText(
      '( P )', 
      this.displayXPosition(), 
      this.displayYPosition(), 
      this.displayWidth(), 
      this.displayHeight(), 
      'center'
    );
  }

  drawCardBack() {
    this._contentLayer.bitmap.blt(this._backImage, 0, 0, this.width, this.height, 0, 0);
  }

  isDisabled() {
    return this._disabled;
  }

  updateStates() {
    if (this._status) this._status.updateState();
  }

  updateBehaviors() {
    if (Array.isArray(this._behaviors)) {
      this._behaviors.forEach(behavior => {
        if (behavior) behavior.updateBehavior();
      });
    }
  }

  addBehavior(behavior, ...params) {
    this._behaviors.push(new behavior(this, ...params));
  }

  removeBehavior(behavior) {
    behavior = this.getBehavior(behavior);
    if (!behavior) return;
    this._behaviors = this._behaviors.filter(b => b !== behavior);
  }

  getBehavior(behavior) {
    if (typeof behavior === 'function') {
      return this._behaviors.find(b => b.constructor === behavior) || false;
    } else {
      return this._behaviors.find(b => b === behavior) || false;
    }
  }

  static create(type, color, figureName, attack, health) {
    const card = new CardSprite();
    card.setCard(
      type || CardTypes.BATTLE, 
      color || CardColors.BROWN, 
      figureName || 'default', 
      attack || 0, 
      health || 0
    );
    return card;
  }

  setCard(type, color, figureName, attack, health) {
    this.setType(type);
    this.setColor(color);
    this.setFigure(figureName);
    this.setBackImage();
    this._attackPoints = attack;
    this._healthPoints = health;
  }

  setType(type) {
    this._type = type;
  }

  setColor(color) {
    this._color = color;
  }

  setFigure(figureName) {
    this._figure = ImageManager.loadCard(figureName);
    // test
    // this._figure = new Bitmap(this.width, this.height);
    // this._figure.fillAll('yellow');
  }

  setBackImage() {
    this._backImage = new Bitmap(this.width, this.height);
    this._backImage.gradientFillRect (0, 0, this.width, this.height, '#555', '#000');
  }

  open() {
    this.addAction(this.commandOpen);
  }

  commandOpen() {
    if (this.isVisible() && this.isStopped() && this.isClosed()) {
      const xPositionOpening = this.x - (this.cardOriginalWidth() / 2);
      this.changeStatus(CardSpriteOpeningState, xPositionOpening);
    }
  }

  isClosed() {
    return this.width === 0;
  }

  opened() {
    this.width = this.cardOriginalWidth();
    this.stop();
  }

  close() {
    this.addAction(this.commandClose);
  }

  commandClose() {
    if (this.isVisible() && this.isStopped() && this.isOpened()) {
      const xPositionClosing = this.x + (this.cardOriginalWidth() / 2);
      this.changeStatus(CardSpriteOpeningState, xPositionClosing);
    }
  }

  isOpened() {
    return this.width === this.cardOriginalWidth();
  }

  closed() {
    this.width = 0;
    this.stop();
  }

  toMove(destinyXPosition, destinyYPosition, originXPosition, originYPosition) {
    this.addAction(
      this.commandMoving, 
      destinyXPosition, 
      destinyYPosition,
      originXPosition, 
      originYPosition
    );
  }

  commandMoving(destinyXPosition, destinyYPosition, originXPosition = this.x, originYPosition = this.y) {
    if (this.isVisible() && this.isStopped()) {
      this.changeStatus( 
        CardSpriteMovingState,
        destinyXPosition,
        destinyYPosition,
        originXPosition,
        originYPosition
      );
    }
  }

  hover() {
    if (this.isVisible() && this.isStopped()) {
      this.addBehavior(CardSpriteHoveredBehavior);
    }
  }

  unhover() {
    this._hoveredLayer.bitmap.clear();
    this.removeBehavior(CardSpriteHoveredBehavior);
  }

  select() {
    if (this.isVisible() && (this.isStopped() || this.isMoving() || this.isZooming())) {
      this.addBehavior(CardSpriteSelectedBehavior);
    }
  }

  isZooming() {
    // return this.getStatus() instanceof CardSpriteZoomingState;
    return true;
  }

  unselect() {
    this._selectedLayer.bitmap.clear();
    this.removeBehavior(CardSpriteSelectedBehavior);
  }

  flash(color = 'white', duration = 60, times = 1) {
    if (this.isVisible() && (this.isStopped() || this.isMoving() || this.isZooming())) {
      this.addBehavior(
        CardSpriteFlashedBehavior,
        color, 
        duration, 
        times
      );
    }
  }

  damageAnimation(times = 1) {
    const animation = this.damage();
    this.animate(animation, times);
  }

  damage() {
    return {
      id: 45,
      displayType: 0,
      effectName: "CureOne1",
      flashTimings:  [
        {frame: 0, duration: 10, color: [0,255,0,102]},
        {frame: 9, duration: 30, color: [102,255,0,102]},
        {frame: 19, duration: 30, color: [136,255,0,102]},
        {frame: 29, duration: 30, color: [136,255,0,102]}
      ],
      name: "Curar 1",
      offsetX: 48,
      offsetY: 128,
      rotation:  { x: 0, y: 0, z: 0 },
      scale: 100,
      soundTimings:  [
        // {frame: 1, se:  { name: "Ice1", pan: 0, pitch: 100, volume: 90}},
        // {frame: 2, se:  { name: "Recovery", pan: 0, pitch: 70, volume: 90}},
        // {frame: 6, se:  { name: "Ice4", pan: 0, pitch: 100, volume: 90}}
      ],
      speed: 100,
      timings: [],
      alignBottom: false,
      quakeEffect: false
    };
  }

  animate(animation, times) {
    if (this.isVisible() && (this.isStopped() || this.isMoving() || this.isZooming())) {
      this.addBehavior(
        CardSpriteAnimatedBehavior, 
        animation,
        times
      );
    }
  }

  changeAttackPoints(attackPoints) {
    this.changePoints(attackPoints);
  }

  changeHealthPoints(healtPoints) {
    this.changePoints(this._attackPoints, healtPoints);
  }

  changePoints(attackPoints = this._attackPoints, healtPoints = this._healthPoints) {
    if (this.isVisible() && this.isStopped()) {
      this.addBehavior(
        CardSpriteUpdatedBehavior, 
        attackPoints,
        healtPoints
      );
    }
  }

  disable() {
    this._disabled = true;
    this._disabledLayer.visible = true;
    this.refresh();
  }

  isBusy() {
    return this.isNotStopped() || this.hasActions();
  }

  isNotStopped() {
    return !this.isStopped();
  }

  zoom() {
    this.addAction(this.commandZoom);
  }

  commandZoom() {
    if (this.isVisible() && this.isStopped() && this.isOpened() && this.isNoZoom()) {
      const destinyXPosition = this.x - ((this.width / 2) / 2);
      const destinyYPosition = this.y - ((this.height / 2) / 2);
      const destinyXScale = (this.scale.x / 2) * 3;
      const destinyYScale = (this.scale.y / 2) * 3;
      this.changeStatus(
        CardSpriteZoomState,
        destinyXPosition,
        destinyYPosition,
        destinyXScale,
        destinyYScale
      );
    }
  }

  isNoZoom() {
    return this.scale.x === 1 && this.scale.y === 1;
  }

  zoomOut() {
    this.addAction(this.commandZoomOut);
  }

  commandZoomOut() {
    if (this.isVisible() && this.isStopped() && this.isOpened() && this.isZoom()) {
      const destinyXPosition = this.x + ((this.width / 2) / 2);
      const destinyYPosition = this.y + ((this.height / 2) / 2);
      const destinyXScale = ((this.scale.x / 3) * 2);
      const destinyYScale = ((this.scale.y / 3) * 2);
      this.changeStatus(
        CardSpriteZoomState,
        destinyXPosition,
        destinyYPosition, 
        destinyXScale,
        destinyYScale        
      );
    }
  }

  isZoom() {
    return this.scale.x > 1 || this.scale.y > 1;
  }

  leave() {
    this.addAction(this.commandLeave);
  }

  commandLeave() {
    if (this.isVisible() && this.isStopped() && this.isOpened()) {
      const xPositionClosing = this.x + (this.cardOriginalWidth() / 2);
      const yPositionClosing = this.y + (this.cardOriginalHeight() / 2);
      this.changeStatus(CardSpriteOpeningState, xPositionClosing, yPositionClosing);
    }
  }

}