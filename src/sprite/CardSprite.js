// include ./state/CardSpriteStoppedState.js
// include ./state/CardSpriteMovingState.js
// include ./state/CardSpriteOpeningState.js
// include ./state/CardSpriteZoomState.js
// include ./behavior/CardSpriteAnimatedBehavior.js
// include ./behavior/CardSpriteFlashedBehavior.js
// include ./behavior/CardSpriteSelectedBehavior.js
// include ./behavior/CardSpriteHoveredBehavior.js
// include ./behavior/CardSpriteUpdatedBehavior.js
// include ./behavior/CardSpriteIluminatedBehavior.js

class CardSprite extends ActionSprite {
  initialize() {
    super.initialize();
    this._type = 0;
    this._color = 0;
    this._figure = {};
    this._backImage = {};
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
    this.commandHide();
    this.setSize();
    this.createLayers();
    this.stop();
  }

  setToDown() {
    this._turned = false;
  }

  setSize() {
    this.width = this.contentOriginalWidth();
    this.height = this.contentOriginalHeight();
  }

  contentOriginalWidth() {
    return 96;
  }

  contentOriginalHeight() {
    return 128;
  }

  createLayers() {
    this.createContentLayer();
    this.createSelectedLayer();
    this.createHoveredLayer();
  }

  createContentLayer() {
    this._contentLayer = new Sprite();
    this._contentLayer.bitmap = new Bitmap(this.contentOriginalWidth(), this.contentOriginalHeight());
    this.createDisableLayer();
    this.createFlashLayer();
    this.addChild(this._contentLayer);
  }

  createDisableLayer() {
    this._disabledLayer = new Sprite();
    this._disabledLayer.visible = false;
    this._disabledLayer.opacity = 128;
    this._disabledLayer.bitmap = new Bitmap(this.contentOriginalWidth(), this.contentOriginalHeight());
    this._disabledLayer.bitmap.fillAll('black');
    this._contentLayer.addChild(this._disabledLayer);
  }

  createFlashLayer() {
    this._flashedLayer = new Sprite();
    this._flashedLayer.bitmap = new Bitmap(this.contentOriginalWidth(), this.contentOriginalHeight());
    this._contentLayer.addChild(this._flashedLayer);
  }

  createHoveredLayer() {
    this._hoveredLayer = new Sprite();
    this._hoveredLayer.bitmap = new Bitmap(this.contentOriginalWidth(), this.contentOriginalHeight());
    this.addChild(this._hoveredLayer);
  }

  createSelectedLayer() {
    this._selectedLayer = new Sprite();
    this._selectedLayer.bitmap = new Bitmap(this.contentOriginalWidth(), this.contentOriginalHeight());
    this.addChild(this._selectedLayer);
  }

  enable() {
    this._disabled = false;
    this._disabledLayer.visible = false;
    this.refresh();
  }

  stop() {
    this.changeStatus(CardSpriteStoppedState);
  }

  update() {
    if (this.hasActions() && this.isStopped()) this.executeAction();
    if (this.isMoving() && this.isHidden()) this.commandShow();
    if (this.isVisible()) {
      this.updateStates();
      this.updateBehaviors();
    }
    super.update();
  }

  isStopped() {
    return this.getStatus() instanceof CardSpriteStoppedState;
  }

  isMoving() {
    return this.getStatus() instanceof CardSpriteMovingState;
  }

  commandShow() {
    super.commandShow();
    if (this.isOpened()) this.refresh();
    return true;
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
    const borderColor = this.getBorderColor();
    this._contentLayer.bitmap.fillRect(xPosition, yPosition, this.width, this.height, borderColor);
    const color = this.getBackgroundColor();
    this._contentLayer.bitmap.fillRect(xPosition + 2, yPosition + 2, this.width - 4, this.height - 4, color);
  }

  getBorderColor() {
    switch (this._color) {
      case CardColors.RED:
        return '#990000';
        break;
      case CardColors.GREEN:
        return '#009900';
        break;
      case CardColors.BLUE:
        return '#000099';
        break;
      case CardColors.WHITE:
        return '#959595';
        break;
      case CardColors.BLACK:
        return '#101010';
        break;
      default:
        const brown = '#852828';
        return brown;
        break;
    }
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
        return '#e5e5e5';
        break;
      case CardColors.BLACK:
        return '#191919';
        break;
      default:
        const brown = '#a52a2a';
        return brown;
        break;
    }
  }

  drawCardFigure() {
    const contentX = 4;
    const contentY = 4;
    const contentWidth = this.contentOriginalWidth() - 8;
    const contentHeight = this.contentOriginalHeight() - 28;
    const openWidthPercent = Math.floor((this.width / this.contentOriginalWidth()) * 100);
    const openHeightPercent = Math.floor((this.height / this.contentOriginalHeight()) * 100);
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
    if (!(this.isStopped() && this.isClosed())) return;
    const xPositionOpening = this.x - (this.contentOriginalWidth() / 2);
    const yPositionOpening = this.y;
    this.visible = true;
    this.changeStatus(CardSpriteOpeningState, xPositionOpening, yPositionOpening);
    return true;
  }

  isClosed() {
    return this.width === 0;
  }

  opened() {
    this.setSize();
    this.stop();
  }

  close() {
    this.addAction(this.commandClose);
  }

  commandClose() {
    if (!(this.isVisible() && this.isStopped() && this.isOpened())) return;
    const xPositionClosing = this.x + (this.contentOriginalWidth() / 2);
    const yPositionOpening = this.y;
    this.changeStatus(CardSpriteOpeningState, xPositionClosing, yPositionOpening);
    return true;
  }

  isOpened() {
    return this.width === this.contentOriginalWidth();
  }

  closed() {
    this.width = 0;
    this.visible = false;
    this.stop();
  }

  toMove(destinyXPosition, destinyYPosition, originXPosition, originYPosition, duration) {
    this.addAction(
      this.commandMoving, 
      destinyXPosition, 
      destinyYPosition,
      originXPosition, 
      originYPosition,
      duration
    );
  }

  commandMoving(
    destinyXPosition = this.x, 
    destinyYPosition = this.y, 
    originXPosition = this.x, 
    originYPosition = this.y, 
    duration
  ) {
    if (!(this.isVisible() && this.isStopped())) return;
    this.changeStatus( 
      CardSpriteMovingState,
      destinyXPosition,
      destinyYPosition,
      originXPosition,
      originYPosition,
      duration
    );
    return true;
  }

  hover() {
    this.addAction(this.commandHover);
  }

  commandHover() {
    if (!(this.isVisible() && this.isStopped())) return;
    this.addBehavior(CardSpriteHoveredBehavior);
    return true;
  }

  unhover() {
    this.addAction(this.commandUnhover);
  }

  commandUnhover() {
    this._hoveredLayer.bitmap.clear();
    this.removeBehavior(CardSpriteHoveredBehavior);
    return true;
  }

  select() {
    this.addAction(this.commandSelect);
  }

  commandSelect() {
    if (!(this.isVisible() && 
      (this.isStopped() || this.isOpening() || this.isMoving() || this.isZooming()))) return; 
    this.addBehavior(CardSpriteSelectedBehavior);
    return true;
  }

  isZooming() {
    return this.getStatus() instanceof CardSpriteZoomState;
  }

  isOpening() {
    return this.getStatus() instanceof CardSpriteOpeningState;
  }

  unselect() {
    this.addAction(this.commandUnselect);
  }

  commandUnselect() {
    this._selectedLayer.bitmap.clear();
    this.removeBehavior(CardSpriteSelectedBehavior);
    return true;
  }

  flash(color = 'white', duration = 60, times = 1) {
    this.addAction(this.commandFlash, color, duration, times);
  }

  commandFlash(color, duration, times) {
    if (!(this.isVisible() 
      && (this.isStopped() || this.isOpening() || this.isMoving() || this.isZooming()))) return;
    this.addBehavior(
      CardSpriteFlashedBehavior,
      color, 
      duration, 
      times
    );
    return true;
  }

  damage(times = 1) {
    const animation = this.damageAnimation();
    this.addAction(this.commandAnimate, animation, times);
  }

  damageAnimation() {
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

  commandAnimate(animation, times) {
    this.animate(animation, times);
    return true;
  }

  animate(animation, times) {
    if (this.isVisible() && (this.isStopped() || this.isOpening() || this.isMoving() || this.isZooming())) {
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
    this.addAction(this.commandChangePoints, attackPoints, healtPoints);
  }

  commandChangePoints(attackPoints, healtPoints) {
    if (!(this.isVisible() && this.isStopped())) return;
    this.addBehavior(
      CardSpriteUpdatedBehavior, 
      attackPoints,
      healtPoints
    );
    return true;
  }

  disable() {
    this._disabled = true;
    this._disabledLayer.visible = true;
    this.refresh();
  }

  isBusy() {
    return this.hasActions() || this.isNotStopped();
  }

  isNotStopped() {
    return !this.isStopped();
  }

  zoom() {
    this.addAction(this.commandZoom);
  }

  commandZoom() {
    if (!(this.isVisible() && this.isStopped() && this.isOpened() && this.isNoZoom())) return;
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
    return true;
  }

  isNoZoom() {
    return this.scale.x === 1 && this.scale.y === 1;
  }

  zoomOut() {
    this.addAction(this.commandZoomOut);
  }

  commandZoomOut() {
    if (!(this.isVisible() && this.isStopped() && this.isOpened() && this.isZoom())) return;
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
    return true;
  }

  isZoom() {
    return this.scale.x > 1 || this.scale.y > 1;
  }

  leave() {
    this.addAction(this.commandLeave);
  }

  commandLeave() {
    if (!(this.isVisible() && this.isStopped() && this.isOpened())) return;
    const xPositionClosing = this.x + (this.contentOriginalWidth() / 2);
    const yPositionClosing = this.y + (this.contentOriginalHeight() / 2);
    this.changeStatus(CardSpriteOpeningState, xPositionClosing, yPositionClosing);
    return true;
  }

  quake(times, distance) {
    this.addAction(this.commandQuake, times, distance);
  }

  commandQuake(times = 1, distance = 2) {
    if (!this.isVisible() && this.isStopped() && this.isOpened()) return;
    const directions = ['TOP', 'BOTTOM', 'LEFT', 'RIGHT'];
    const moves = [];
    let direction = '';
    for (let index = 0; index < (times * 3); index++) {
      const dirs = directions.filter(dir => dir !== direction);
      direction = dirs[Math.randomInt(3)];
      switch (direction) {
        case 'TOP':
          moves.push({x: 0, y: -distance}, {x: 0, y: 0});
          break;
        case 'BOTTOM':
          moves.push({x: 0, y: distance}, {x: 0, y: 0});
          break;
        case 'LEFT':
          moves.push({x: -distance, y: 0}, {x: 0, y: 0});
          break;
        case 'RIGHT':
          moves.push({x: distance, y: 0}, {x: 0, y: 0});
          break;
      }
    }
    const cardXPosition = this.x;
    const cardYPosition = this.y; 
    moves.forEach((move, index) => {
      const xMove = cardXPosition + move.x;
      const yMove = cardYPosition + move.y;
      const duration = 0.01;
      this.toMove(xMove, yMove, cardXPosition, cardYPosition, duration);
    });
    return true;
  }
  
  isAnimationPlaying() {
    const behavior = this.getBehavior(CardSpriteAnimatedBehavior);
    if (behavior) return behavior.isPlayingAnimation();
    return false;
  }

  setPosition(xPosition, yPosition) {
    this.x = xPosition;
    this.y = yPosition;
  }

  startOpen(xPosition = this.x, yPosition = this.y) {
    this.x = xPosition;
    this.y = yPosition;
    if (this.width !== 0) return;
    this.opened();
  }

  startClosed(xPosition = this.x, yPosition = this.y) {
    this.x = xPosition;
    this.y = yPosition;
    if (this.width === 0) return;
    const cardWidthHalf = (this.contentOriginalWidth() / 2);
    this.x = this.x + cardWidthHalf;
    this.closed();
  }

  flipToUp() {
    this.addAction(this.commandClose);
    this.addAction(this.commandFlipToUp);
    this.addAction(this.commandOpen);
  }

  commandFlipToUp() {
    if (!(this.isVisible() && this.isStopped() && this.isClosed() && this.isToDown())) return;
    this._turned = true;
    this.refresh();
    return true;
  }

  isToDown() {
    return !this._turned;
  }

  isHovered() {
    return this.getBehavior(CardSpriteHoveredBehavior) instanceof CardSpriteHoveredBehavior;
  }

  iluminate() {
    this.addAction(this.commandIluminate);
  }

  commandIluminate() {
    if (!(this.isVisible() && 
      (this.isStopped() || this.isOpening() || this.isMoving() || this.isZooming()))) return; 
    this.addBehavior(CardSpriteIluminatedBehavior);
    return true;
  }
}