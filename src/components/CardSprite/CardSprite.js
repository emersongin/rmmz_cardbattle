// include ./CardStoppedState.js
// include ./CardOpennessState.js
// include ./CardZoomState.js
// include ./AnimationBehavior.js
// include ./FlashBehavior.js
// include ./PointsUpdateBehavior.js
// include ./MarkedBehavior.js
// include ./SelectedBehavior.js
// include ./HoveredBehavior.js
// include ./IluminatedBehavior.js

class CardSprite extends ActionSprite {
  static create(type, color, figureName, attack, health, x, y) {
    if (!type || !color || !figureName) {
      throw new Error('Card inválido!');
    }
    const card = new CardSprite(x, y);
    card.setCard(
      type, 
      color, 
      figureName, 
      attack, 
      health
    );
    return card;
  }

  setCard(type, color, figureName, attack = 0, health = 0) {
    this.setType(type);
    this.setColor(color);
    this.setFigure(figureName);
    this.setBackImage();
    this._attackPoints = attack;
    this._healthPoints = health;
  }

  setType(type) {
    if (!type) {
      throw new Error('Card type is required');
    }
    this._type = type;
  }

  setColor(color) {
    if (!color) {
      throw new Error('Card color is required');
    }
    this._color = color;
  }

  setFigure(figureName = 'default') {
    this._figure = ImageManager.loadCard(figureName);
  }

  setBackImage() {
    this._backImage = new Bitmap(this.width, this.height);
    this._backImage.gradientFillRect(0, 0, this.width, this.height, '#555', '#000');
  }

  initialize(x, y) {
    super.initialize(x, y);
    this._type = '';
    this._color = '';
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
    this._status = new CardStoppedState(this);
    this.setup();
  }

  setup() {
    this.hide();
    this.enable();
    this.setTurnToUp();
    this.setOriginalSize();
    this.createLayers();
  }

  stop() {
    this.addAction(this.commandStop);
  }

  commandStop() {
    return this._status?.stop();
  }

  setTurnToUp() {
    this._turned = true;
  }

  setOriginalSize() {
    this.width = CardSprite.contentOriginalWidth();
    this.height = CardSprite.contentOriginalHeight();
  }

  static contentOriginalWidth() {
    return 96;
  }

  static contentOriginalHeight() {
    return 120;
  }

  createLayers() {
    this.createContentLayer();
    this.createSelectedLayer();
    this.createHoveredLayer();
  }

  createContentLayer() {
    this._contentLayer = new Sprite();
    this._contentLayer.bitmap = new Bitmap(CardSprite.contentOriginalWidth(), CardSprite.contentOriginalHeight());
    this.createDisableLayer();
    this.createFlashLayer();
    this.addChild(this._contentLayer);
  }

  createDisableLayer() {
    this._disabledLayer = new Sprite();
    this._disabledLayer.visible = false;
    this._disabledLayer.opacity = 128;
    this._disabledLayer.bitmap = new Bitmap(CardSprite.contentOriginalWidth(), CardSprite.contentOriginalHeight());
    this._disabledLayer.bitmap.fillAll('black');
    this._contentLayer.addChild(this._disabledLayer);
  }

  createFlashLayer() {
    this._flashedLayer = new Sprite();
    this._flashedLayer.bitmap = new Bitmap(CardSprite.contentOriginalWidth(), CardSprite.contentOriginalHeight());
    this._contentLayer.addChild(this._flashedLayer);
  }

  createHoveredLayer() {
    this._hoveredLayer = new Sprite();
    this._hoveredLayer.bitmap = new Bitmap(CardSprite.contentOriginalWidth(), CardSprite.contentOriginalHeight());
    this.addChild(this._hoveredLayer);
  }

  createSelectedLayer() {
    this._selectedLayer = new Sprite();
    this._selectedLayer.bitmap = new Bitmap(CardSprite.contentOriginalWidth(), CardSprite.contentOriginalHeight());
    this.addChild(this._selectedLayer);
  }

  enable() {
    this.addAction(this.commandEnable);
  }

  commandEnable() {
    this._disabled = false;
    this._disabledLayer.visible = false;
    if (this.isVisible()) this.refresh();
  }

  disable() {
    this.addAction(this.commandDisable);
  }

  commandDisable() {
    this._disabled = true;
    this._disabledLayer.visible = true;
    if (this.isVisible()) this.refresh();
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
      case GameConst.RED:
        return ColorHelper.getColorHex(GameColors.FADEDRED);
        break;
      case GameConst.GREEN:
        return ColorHelper.getColorHex(GameColors.FADEDGREEN);
        break;
      case GameConst.BLUE:
        return ColorHelper.getColorHex(GameColors.FADEDBLUE);
        break;
      case GameConst.WHITE:
        return ColorHelper.getColorHex(GameColors.FADEDWHITE);
        break;
      case GameConst.BLACK:
        return ColorHelper.getColorHex(GameColors.FADEDBLACK);
        break;
      default:
        return ColorHelper.getColorHex(GameColors.FADEDBROWN);
        break;
    }
  }

  getBackgroundColor() {
    switch (this._color) {
      case GameConst.RED:
        return ColorHelper.getColorHex(GameColors.RED);
        break;
      case GameConst.GREEN:
        return ColorHelper.getColorHex(GameColors.GREEN);
        break;
      case GameConst.BLUE:
        return ColorHelper.getColorHex(GameColors.BLUE);
        break;
      case GameConst.WHITE:
        return ColorHelper.getColorHex(GameColors.WHITE);
        break;
      case GameConst.BLACK:
        return ColorHelper.getColorHex(GameColors.BLACK);
        break;
      default:
        return ColorHelper.getColorHex(GameColors.BROWN);
        break;
    }
  }

  drawFigure() {
    const contentX = 4;
    const contentY = 4;
    const contentWidth = CardSprite.contentOriginalWidth() - 8;
    const contentHeight = CardSprite.contentOriginalHeight() - 28;
    const openWidthPercent = Math.floor((this.width / CardSprite.contentOriginalWidth()) * 100);
    const openHeightPercent = Math.floor((this.height / CardSprite.contentOriginalHeight()) * 100);
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
      case GameConst.BATTLE:
          this.drawPoints();
        break;
      case GameConst.POWER:
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
    if (this.isOpened()) return false;
    this.setPosition(xPosition, yPosition);
    this.opened();
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
    if (this.isClosed()) return false;
    this.setPosition(xPosition, yPosition);
    const cardWidthHalf = (CardSprite.contentOriginalWidth() / 2);
    this.x = this.x + cardWidthHalf;
    this.closed();
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
  }

  isOpened() {
    return this.width === CardSprite.contentOriginalWidth() && this.visible;
  }

  open() {
    this.show();
    this.addAction(this.commandOpen);
  }

  commandOpen() {
    return this._status?.open();
  }

  isStopped() {
    return this.getStatus() instanceof CardStoppedState;
  }

  close() {
    this.addAction(this.commandClose);
    this.hide();
  }

  commandClose() {
    return this._status?.close();
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
    moves = ArrayHelper.toArray(moves);
    this.addAction(this.commandMoving, moves);
  }

  commandMoving(moves) {
    return this._status?.toMove(moves);
  }

  hover() {
    this.addAction(this.commandHover);
  }

  commandHover() {
    if (!(this.isOpened() && this.isStopped())) return false;
    if (this.isHovered()) return true;
    this.addBehavior(HoveredBehavior);
  }

  addBehavior(behavior, ...params) {
    this._behaviors.push(new behavior(this, ...params));
  }

  isHovered() {
    return this.getBehavior(HoveredBehavior) instanceof HoveredBehavior;
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
    if (this.isUnhovered()) return true;
    this._hoveredLayer.bitmap.clear();
    this.removeBehavior(HoveredBehavior);
  }

  removeBehavior(behavior) {
    behavior = this.getBehavior(behavior);
    if (!behavior) return false;
    this._behaviors = this._behaviors.filter(b => b !== behavior);
  }

  select() {
    this.addAction(this.commandSelect);
  }

  commandSelect() {
    if (!(this.isOpened() && this.isStopped())) return false; 
    if (this.isSelected()) return true;
    this.addBehavior(SelectedBehavior);
  }

  isSelected() {
    return this.getBehavior(SelectedBehavior) instanceof SelectedBehavior;
  }

  unselect() {
    this.addAction(this.commandUnselect);
  }

  commandUnselect() {
    if (this.isUnselected()) return true;
    this._selectedLayer.bitmap.clear();
    this.removeBehavior(SelectedBehavior);
  }

  isUnselected() {
    return !this.isSelected();
  }

  iluminate() {
    this.addAction(this.commandIluminate);
  }

  commandIluminate() {
    const isStatus = (this.isStopped() || this.isMoving() || this.isZooming());
    if (!(this.isOpened() && isStatus)) return false;
    if (this.isIluminated()) return true; 
    this.addBehavior(IluminatedBehavior);
  }

  isMoving() {
    return this.getStatus() instanceof SpriteMovementState;
  }

  isZooming() {
    return this.getStatus() instanceof CardZoomState;
  }

  isIluminated() {
    return this.getBehavior(IluminatedBehavior) instanceof IluminatedBehavior;
  }

  uniluminate() {
    this.addAction(this.commandUniluminate);
  }

  commandUniluminate() {
    if (this.isUniluminated()) return true;
    this._selectedLayer.bitmap.clear();
    this.removeBehavior(IluminatedBehavior);
  }

  isUniluminated() {
    return !this.isIluminated();
  }

  flash(color = 'white', duration = 10, times = 1) {
    this.addAction(this.commandFlash, color, duration, times);
  }

  commandFlash(color, duration, times) {
    const isStatus = (this.isStopped() || this.isMoving() || this.isZooming());
    if (!(this.isOpened() && isStatus) || this.isFlashPlaying()) return false; 
    this.addBehavior(
      FlashBehavior,
      color, 
      duration, 
      times
    );
  }

  isFlashPlaying() {
    return this.getBehavior(FlashBehavior) instanceof FlashBehavior;
  }

  damage(times = 1, anchorParent = this.parent, trigger) {
    const animation = this.damageAnimation();
    this.addTriggerAction(this.commandAnimate, trigger, animation, times, anchorParent);
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
    const isStatus = (this.isStopped() || this.isMoving() || this.isZooming());
    if (!(this.isOpened() && isStatus) || this.isAnimationPlaying()) return false; 
    this.addBehavior(
      AnimationBehavior, 
      animation,
      times,
      anchorParent
    );
  }

  isAnimationPlaying() {
    return this.getBehavior(AnimationBehavior) instanceof AnimationBehavior;
  }

  quake(times = 1, distance = 8, movements = null) {
    this.addAction(this.commandQuake, times, distance, movements);
  }

  commandQuake(times, distance, movements) {
    if (!this.isOpened() && this.isStopped()) return false;
    const moves = movements || CardSprite.generateQuakeMoves(times, distance);
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
  }

  zoom() {
    this.addAction(this.commandZoom);
  }

  commandZoom() {
    return this._status?.zoom();
  }

  isOriginalScale() {
    return this.scale.x === 1 && this.scale.y === 1;
  }

  zoomOut() {
    this.addAction(this.commandZoomOut);
  }

  commandZoomOut() {
    return this._status?.zoomOut();
  }

  isZoom() {
    return this.scale.x > 1 || this.scale.y > 1;
  }

  leave() {
    this.addAction(this.commandLeave);
    this.hide();
  }

  commandLeave() {
    return this._status?.leave();
  }

  flipTurnToUp() {
    this.close();
    this.addAction(this.commandFlipTurnToUp);
    this.open();
  }

  commandFlipTurnToUp() {
    if (!(this.isClosed() && this.isStopped() && this.isTurnedToDown())) return false;
    this.setTurnToUp();
    this.refresh();
  }

  isTurnedToDown() {
    return !this._turned;
  }

  flipTurnToDown() {
    this.close();
    this.addAction(this.commandFlipTurnToDown);
    this.open();
  }

  commandFlipTurnToDown() {
    if (!(this.isClosed() && this.isStopped() && this.isTurnedToUp())) return false;
    this._turned = false;
    this.refresh();
  }

  setTurnToDown() {
    this.addAction(this.commandSetTurnToDown);
  }

  commandSetTurnToDown() {
    if (this.isTurnedToDown()) return true;
    this._turned = false;
    this.refresh();
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
    if (!(this.isOpened() && this.isStopped())) return false;
    this.addBehavior(
      PointsUpdateBehavior, 
      attackPoints,
      healtPoints
    );
  }

  update() {
    super.update();
    if (this.isVisible()) this.updateBehaviors();
  }

  updateBehaviors() {
    if (Array.isArray(this._behaviors)) {
      this._behaviors.forEach(behavior => {
        if (behavior) behavior.updateBehavior();
      });
    }
  }

  static createPosition(x, y, index) {
    return { x, y, index };
  }

  static generateQuakeMoves(times = 1, distance = 2) {
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
    return moves;
  }

  isOpening() {
    return this.getStatus() instanceof CardOpennessState;
  }

  isBusy() {
    return (this.getStatus() && this.isNotStopped()) || this.isAnimated() || this.someDelayCommand();
  }

  isNotStopped() {
    return !this.isStopped();
  }

  isAnimated() {
    return this.isAnimationPlaying() || this.isFlashPlaying() || this.isUpdatingPoints();
  }

  isUpdatingPoints() {
    return this.getBehavior(PointsUpdateBehavior) instanceof PointsUpdateBehavior;
  }
}