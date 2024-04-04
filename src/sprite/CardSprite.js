// include ./state/CardSpriteStoppedState.js
// include ./state/CardSpriteMovingState.js
// include ./state/CardSpriteClosedState.js
// include ./state/CardSpriteOpeningState.js
// include ./state/CardSpriteOpenState.js
// include ./state/CardSpriteClosingState.js
// include ./state/CardSpriteAnimatedState.js
// include ./state/CardSpriteFlashedState.js
// include ./state/CardSpriteSelectedState.js
// include ./state/CardSpriteHoveredState.js
// include ./CardAnimationSprite.js

class CardSprite extends ActionSprite {
  initialize() {
    super.initialize();
    this._type = 0;
    this._color = 0;
    this._figure = {};
    this._backImage = {};
    this._states = [];
    this._turned = true;
    this._attackPoints = 0;
    this._healthPoints = 0;
    this._x = this.x;
    this._y = this.y;
    this._contentLayer = {};
    this._flashedLayer = {};
    this._hoveredLayer = {};
    this._selectedLayer = {};
    this.attackDisplay = 0;
    this.healthDisplay = 0;
    // this._animationSprite = null;
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
    this.createFlashLayer();
    this.addChild(this._contentLayer);
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

  hide() {
    this.visible = false;
  }

  stop() {
    this.changeState(CardStates.MAIN, CardSpriteStoppedState);
  }

  changeState(keyName, state, ...params) {
    this._states[keyName] = new state(this, ...params);
  }

  update() {
    if (this.hasActions() && (this.isStopped())) this.executeAction();
    if (this.isMoving() && this.isHidden()) this.show();
    if (this.isVisible()) this.updateStates();
    super.update();
  }

  isStopped() {
    return this.getState(CardStates.MAIN) instanceof CardSpriteStoppedState;
  }

  getState(keyName) {
    return this._states[keyName];
  }

  isMoving() {
    return this.getState(CardStates.MAIN) instanceof CardSpriteMovingState;
  }

  isHidden() {
    return !this.isVisible();
  }

  isVisible() {
    return this.visible;
  }

  show() {
    this.refresh();
    this.visible = true;
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
    const openPercent = Math.floor((this.width / this.cardOriginalWidth()) * 100);
    const openWidth = Math.floor((contentWidth * openPercent) / 100);
    const figureX = 0;
    const figureY = 0;
    const figureWidth = openWidth ? this._figure.width : 0;
    const figureHeight = this._figure.height;
    this._contentLayer.bitmap.blt(
      this._figure, 
      figureX, 
      figureY, 
      figureWidth, 
      figureHeight,
      contentX,
      contentY,
      openWidth,
      contentHeight
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

  updateStates() {
    if (Array.isArray(this._states)) {
      this._states.forEach(state => {
        if (state) state.updateState();
      });
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
      this._x = this.x - (this.cardOriginalWidth() / 2);
      this.opening();
    }
  }

  isClosed() {
    return this.width === 0;
  }

  opening() {
    this.changeState(CardStates.MAIN, CardSpriteOpeningState);
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
      this._x = this.x + (this.cardOriginalWidth() / 2);
      this.closing();
    }
  }

  isOpened() {
    return this.width === this.cardOriginalWidth();
  }

  closing() {
    this.changeState(CardStates.MAIN, CardSpriteClosingState);
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

  commandMoving(destinyXPosition, destinyYPosition, originXPosition, originYPosition) {
    if (this.isVisible() && this.isStopped()) {
      this._x = destinyXPosition;
      this._y = destinyYPosition;
      this.x = originXPosition || this.x;
      this.y = originYPosition || this.y;
      this.moving();
    }
  }

  moving() {
    this.changeState(CardStates.MAIN, CardSpriteMovingState);
  }

  hover() {
    if (this.isVisible() && this.isStopped()) {
      this.changeState(CardStates.HOVERED, CardSpriteHoveredState);
    }
  }

  unhover() {
    this._hoveredLayer.bitmap.clear();
    this.removeState(CardStates.HOVERED);
  }

  removeState(keyName) {
    this._states[keyName] = null;
  }

  select() {
    if (this.isVisible() && (this.isStopped() || this.isMoving())) {
      this.changeState(CardStates.SELECTED, CardSpriteSelectedState);
    }
  }

  unselect() {
    this._selectedLayer.bitmap.clear();
    this.removeState(CardStates.SELECTED);
  }

  flash(color = 'white', duration = 60, times = 1) {
    if (this.isVisible() && (this.isStopped() || this.isMoving())) {
      this.changeState(
        CardStates.FLASHED, 
        CardSpriteFlashedState, 
        color, 
        duration, 
        times
      );
    }
  }

  stopFlash() {
    this._flashedLayer.bitmap.clear();
    this.removeState(CardStates.FLASHED);
  }

  damageAnimation() {
    const animation = this.damage();
    this.animate(animation);
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
        {frame: 1, se:  { name: "Ice1", pan: 0, pitch: 100, volume: 90}},
        {frame: 2, se:  { name: "Recovery", pan: 0, pitch: 70, volume: 90}},
        {frame: 6, se:  { name: "Ice4", pan: 0, pitch: 100, volume: 90}}
      ],
      speed: 100,
      timings: [],
      alignBottom: false,
      quakeEffect: false
    };
  }

  animate(animation) {
    if (this.isVisible() && (this.isStopped() || this.isMoving())) {
      const sprite = new CardAnimationSprite();
      sprite.setup([this], animation);
      this.parent.addChild(sprite);
    }
  }











  isBusy() {
    return this.isNotStopped() || this.hasActions();
  }

  isNotStopped() {
    return !this.isStopped();
  }

  isAnimated() {
    return this._state instanceof CardSpriteAnimatedState;
  }

  refreshAndStop() {
    this.refresh();
    this.stop();
  }

  setXPosition(xPosition) {
    this._x = xPosition;
    this.x = xPosition;
  }

  setYPosition(yPosition) {
    this._y = yPosition;
    this.y = yPosition;
  }

  changeAttackPoints(attackPoints) {
    this.addAction(this.commandChangeAttackPoints, attackPoints);
  }

  commandChangeAttackPoints(attackPoints = this._attackPoints) {
    if (this.isStopped() && this.isVisible()) {
      this._attackPoints = attackPoints;
      this.animated();
    }
  }

  changeHealtPoints(HealtPoints) {
    this.addAction(this.commandChangeHealtPoints, HealtPoints);
  }

  commandChangeHealtPoints(HealtPoints = this._HealtPoints) {
    if (this.isStopped() && this.isVisible()) {
      this._HealtPoints = HealtPoints;
      this.animated();
    }
  }
}