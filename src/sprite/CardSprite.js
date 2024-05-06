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
  static create(type, color, figureName, attack, health) {
    const card = new CardSprite();
    card.setCard(
      type || CardTypes.BATTLE, 
      color || HexColors.BROWN, 
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

  initialize() {
    super.initialize();
    this._type = 0;
    this._color = 0;
    this._figure = {};
    this._backImage = {};
    this._behaviors = [];
    this._turned = false;
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
    this.hide();
    this.enable();
    this.stop();
    this.setTurnToUp();
    this.setOriginalSize();
    this.createLayers();
  }

  stop() {
    this.addAction(this.commandStop);
  }

  commandStop() {
    this.changeStatus(CardSpriteStoppedState);
    return true;
  }

  setTurnToUp() {
    this._turned = true;
  }

  setOriginalSize() {
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
    this.addAction(this.commandEnable);
  }

  commandEnable() {
    this._disabled = false;
    this._disabledLayer.visible = false;
    if (this.isVisible()) this.refresh();
    return true;
  }

  disable() {
    this.addAction(this.commandDisable);
  }

  commandDisable() {
    this._disabled = true;
    this._disabledLayer.visible = true;
    if (this.isVisible()) this.refresh();
    return true;
  }

  refresh() {
    this.clearContent();
    this.drawCard();
    this.drawDisableFilter();
  }

  clearContent() {
    this._contentLayer.bitmap.clear();
  }

  drawCard() {
    if (this.isTurnedToUp()) {
      this.drawBackground();
      this.drawFigure();
      this.drawDisplay();
    } else {
      this.drawBack();
    }
  }

  isTurnedToUp() {
    return this._turned;
  }

  drawBackground() {
    const xPosition = 0;
    const yPosition = 0;
    const borderColor = this.getBorderColor();
    this._contentLayer.bitmap.fillRect(xPosition, yPosition, this.width, this.height, borderColor);
    const color = this.getBackgroundColor();
    this._contentLayer.bitmap.fillRect(xPosition + 2, yPosition + 2, this.width - 4, this.height - 4, color);
  }

  getBorderColor() {
    switch (this._color) {
      case ColorTypes.RED:
        return HexColors.FADEDRED;
        break;
      case ColorTypes.GREEN:
        return HexColors.FADEDGREEN;
        break;
      case ColorTypes.BLUE:
        return HexColors.FADEDBLUE;
        break;
      case ColorTypes.WHITE:
        return HexColors.FADEDWHITE;
        break;
      case ColorTypes.BLACK:
        return HexColors.FADEDBLACK;
        break;
      default:
        return HexColors.FADEDBROWN;
        break;
    }
  }

  getBackgroundColor() {
    switch (this._color) {
      case ColorTypes.RED:
        return HexColors.RED;
        break;
      case ColorTypes.GREEN:
        return HexColors.GREEN;
        break;
      case ColorTypes.BLUE:
        return HexColors.BLUE;
        break;
      case ColorTypes.WHITE:
        return HexColors.WHITE;
        break;
      case ColorTypes.BLACK:
        return HexColors.BLACK;
        break;
      default:
        return HexColors.BROWN;
        break;
    }
  }

  drawFigure() {
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

  drawDisplay() {
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
    const attack = StringHelper.convertPointsDisplay(this._attackPoints);
    const health = StringHelper.convertPointsDisplay(this._healthPoints);
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

  drawBack() {
    this._contentLayer.bitmap.blt(this._backImage, 0, 0, this.width, this.height, 0, 0);
  }

  drawDisableFilter() {
    if (this.isDisabled()) {
      this._contentLayer.setColorTone([0, 0, 0, 255]);
    } else {
      this._contentLayer.setColorTone([0, 0, 0, 0]);
    }
  }

  isEnabled() {
    return !this.isDisabled();
  }

  isDisabled() {
    return this._disabled;
  }

  startOpen(xPosition = this.x, yPosition = this.y) {
    this.addAction(this.commandStartOpen, xPosition, yPosition);
  }

  commandStartOpen(xPosition, yPosition) {
    if (this.isOpened()) return;
    this.setPosition(xPosition, yPosition);
    this.opened();
    return true;
  }

  setPosition(xPosition, yPosition) {
    this.x = xPosition;
    this.y = yPosition;
  }

  opened() {
    this.visible = true;
    this.setOriginalSize();
  }

  startClosed(xPosition = this.x, yPosition = this.y) {
    this.addAction(this.commandStartClosed, xPosition, yPosition);
  }

  commandStartClosed(xPosition, yPosition) {
    if (this.isClosed()) return;
    this.setPosition(xPosition, yPosition);
    const cardWidthHalf = (this.contentOriginalWidth() / 2);
    this.x = this.x + cardWidthHalf;
    this.closed();
    return true;
  }

  isClosed() {
    return this.width === 0;
  }

  closed() {
    this.visible = false;
    this.width = 0;
  }

  commandShow() {
    super.commandShow();
    if (this.isOpened()) this.refresh();
    return true;
  }

  isOpened() {
    return this.width === this.contentOriginalWidth() && this.visible;
  }

  open() {
    this.show();
    this.addAction(this.commandOpen);
  }

  commandOpen() {
    if (!(this.isStopped() && this.isClosed())) return;
    const xPositionOpening = this.x - (this.contentOriginalWidth() / 2);
    const yPositionOpening = this.y;
    this.changeStatus(CardSpriteOpeningState, xPositionOpening, yPositionOpening);
    return true;
  }

  isStopped() {
    return this.getStatus() instanceof CardSpriteStoppedState;
  }

  close() {
    this.addAction(this.commandClose);
    this.hide();
  }

  commandClose() {
    if (!(this.isOpened() && this.isStopped())) return;
    const xPositionClosing = this.x + (this.contentOriginalWidth() / 2);
    const yPositionOpening = this.y;
    this.changeStatus(CardSpriteOpeningState, xPositionClosing, yPositionOpening);
    return true;
  }

  static createMove(destinyXPosition, destinyYPosition, originXPosition, originYPosition, duration) {
    return { 
      destinyXPosition, 
      destinyYPosition, 
      originXPosition, 
      originYPosition, 
      duration 
    };
  }

  toMove(moves) {
    moves = this.toArray(moves);
    this.addAction(
      this.commandMoving,
      moves
    );
  }

  commandMoving(moves) {
    if (!(this.isOpened() && this.isStopped())) return;
    this.changeStatus( 
      CardSpriteMovingState,
      moves
    );
    return true;
  }

  hover() {
    this.addAction(this.commandHover);
  }

  commandHover() {
    if (!(this.isOpened() && this.isStopped()) || this.isHovered()) return;
    this.addBehavior(CardSpriteHoveredBehavior);
    return true;
  }

  addBehavior(behavior, ...params) {
    this._behaviors.push(new behavior(this, ...params));
  }

  isHovered() {
    return this.getBehavior(CardSpriteHoveredBehavior) instanceof CardSpriteHoveredBehavior;
  }

  getBehavior(behavior) {
    if (typeof behavior === 'function') {
      return this._behaviors.find(b => b.constructor === behavior) || false;
    } else {
      return this._behaviors.find(b => b === behavior) || false;
    }
  }

  isUnhovered() {
    return !this.isHovered();
  }

  unhover() {
    this.addAction(this.commandUnhover);
  }

  commandUnhover() {
    if (this.isUnhovered()) return;
    this._hoveredLayer.bitmap.clear();
    this.removeBehavior(CardSpriteHoveredBehavior);
    return true;
  }

  removeBehavior(behavior) {
    behavior = this.getBehavior(behavior);
    if (!behavior) return;
    this._behaviors = this._behaviors.filter(b => b !== behavior);
  }

  select() {
    this.addAction(this.commandSelect);
  }

  commandSelect() {
    if (!(this.isOpened() && this.isStopped()) || this.isSelected()) return; 
    this.addBehavior(CardSpriteSelectedBehavior);
    return true;
  }

  isSelected() {
    return this.getBehavior(CardSpriteSelectedBehavior) instanceof CardSpriteSelectedBehavior;
  }

  unselect() {
    this.addAction(this.commandUnselect);
  }

  commandUnselect() {
    if (this.isUnselected()) return;
    this._selectedLayer.bitmap.clear();
    this.removeBehavior(CardSpriteSelectedBehavior);
    return true;
  }

  isUnselected() {
    return !this.isSelected();
  }

  iluminate() {
    this.addAction(this.commandIluminate);
  }

  commandIluminate() {
    const isStatus = (this.isStopped() || this.isMoving() || this.isZooming());
    if (!(this.isOpened() && isStatus) || this.isIluminated()) return; 
    this.addBehavior(CardSpriteIluminatedBehavior);
    return true;
  }

  isMoving() {
    return this.getStatus() instanceof CardSpriteMovingState;
  }

  isZooming() {
    return this.getStatus() instanceof CardSpriteZoomState;
  }

  isIluminated() {
    return this.getBehavior(CardSpriteIluminatedBehavior) instanceof CardSpriteIluminatedBehavior;
  }

  uniluminate() {
    this.addAction(this.commandUniluminate);
  }

  commandUniluminate() {
    if (this.isUniluminated()) return;
    this._selectedLayer.bitmap.clear();
    this.removeBehavior(CardSpriteIluminatedBehavior);
    return true;
  }

  isUniluminated() {
    return !this.isIluminated();
  }

  flash(color = 'white', duration = 60, times = 1) {
    this.addAction(this.commandFlash, color, duration, times);
  }

  commandFlash(color, duration, times) {
    const isStatus = (this.isStopped() || this.isMoving() || this.isZooming());
    if (!(this.isOpened() && isStatus) || this.isFlashPlaying()) return; 
    this.addBehavior(
      CardSpriteFlashedBehavior,
      color, 
      duration, 
      times
    );
    return true;
  }

  isFlashPlaying() {
    return this.getBehavior(CardSpriteFlashedBehavior) instanceof CardSpriteFlashedBehavior;
  }

















  update() {
    super.update();
    if (this.isVisible()) this.updateBehaviors();
  }

  isTurnedToDown() {
    return !this._turned;
  }

  updateBehaviors() {
    if (Array.isArray(this._behaviors)) {
      this._behaviors.forEach(behavior => {
        if (behavior) behavior.updateBehavior();
      });
    }
  }

  isOpening() {
    return this.getStatus() && this.getStatus() instanceof CardSpriteOpeningState;
  }



  damage(times = 1, anchorParent = this.parent) {
    const animation = this.damageAnimation();
    this.addAction(this.commandAnimate, animation, times, anchorParent);
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

  commandAnimate(animation, times, anchorParent) {
    if (this.isVisible() && (this.isStopped() || this.isOpening() || this.isMoving() || this.isZooming())) {
      this.addBehavior(
        CardSpriteAnimatedBehavior, 
        animation,
        times,
        anchorParent
      );
    }
    return true;
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

  isBusy() {
    return super.isBusy() && (this.isNotStopped() || this.isAnimated());
  }

  isNotStopped() {
    return !this.isStopped();
  }

  zoom() {
    this.addAction(this.commandZoom);
  }

  commandZoom() {
    if (!(this.isVisible() && this.isStopped() && this.isOpened() && this.isOriginalScale())) return;
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

  isOriginalScale() {
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

  quake(times = 1, distance = 8, movements = null) {
    this.addAction(this.commandQuake, times, distance, movements);
  }

  commandQuake(times, distance, movements) {
    if (!this.isVisible() && this.isStopped() && this.isOpened()) return;
    const moves = movements || this.generateQuakeMoves(times, distance);
    const cardXPosition = this.x;
    const cardYPosition = this.y; 
    const directionsMoves = moves.map((move, index) => {
      const xMove = cardXPosition + move.x;
      const yMove = cardYPosition + move.y;
      const duration = 0;
      const directionMove = CardSprite.createMove(xMove, yMove, cardXPosition, cardYPosition, duration);
      return directionMove;
    });
    this.toMove(directionsMoves);
    return true;
  }

  isAnimated() {
    return this.isUpdating() || this.isAnimationPlaying() || this.isFlashPlaying();
  }

  isAnimationPlaying() {
    return this.getBehavior(CardSpriteAnimatedBehavior) instanceof CardSpriteAnimatedBehavior;
  }



  isUpdating() {
    return this.getBehavior(CardSpriteUpdatedBehavior) instanceof CardSpriteUpdatedBehavior;
  }
  
  // isAnimationPlaying() {
  //   const behavior = this.getBehavior(CardSpriteAnimatedBehavior);
  //   if (behavior) return behavior.isPlayingAnimation();
  //   return false;
  // }

  flipToUp() {
    this.addAction(this.commandClose);
    this.addAction(this.commandFlipToUp);
    this.addAction(this.commandOpen);
  }

  commandFlipToUp() {
    if (!(this.isHidden() && this.isStopped() && this.isClosed() && this.isTurnedToDown())) return;
    this.setTurnToUp();
    this.refresh();
    return true;
  }

  flipToDown() {
    this.addAction(this.commandClose);
    this.addAction(this.commandFlipToDown);
    this.addAction(this.commandOpen);
  }

  commandFlipToDown() {
    if (!(this.isHidden() && this.isStopped() && this.isClosed() && this.isTurnedToUp())) return;
    this.setToDown();
    this.refresh();
    return true;
  }

  setToDown() {
    this._turned = false;
  }

  static createPosition(x, y, index) {
    return { x, y, index };
  }

  isNormal() {
    return !this.isHovered() && !this.isSelected() && !this.isIluminated();
  }
}