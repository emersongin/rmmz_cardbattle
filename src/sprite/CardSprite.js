// include ./state/CardSpriteStoppedState.js
// include ./state/CardSpriteMovingState.js
// include ./state/CardSpriteClosedState.js
// include ./state/CardSpriteOpeningState.js
// include ./state/CardSpriteOpenState.js
// include ./state/CardSpriteClosingState.js
// include ./state/CardSpriteAnimatedState.js
// include ./state/CardSpriteFlashedState.js
// include ./state/CardSpriteSelectedState.js
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
    this._flashLayer = {};
    this._selectLayer = {};
    this.attackDisplay = 0;
    this.healthDisplay = 0;
    // this._flashDuration = 0;
    // this._animationSprite = null;
    this.setup();
  }

  setup() {
    this.setSize();
    this.stop();
    this.hide();
    this.createLayers();
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

  stop() {
    this.changeState(CardStates.MAIN, CardSpriteStoppedState);
  }

  changeState(keyName, state) {
    this._states[keyName] = new state(this);
  }

  hide() {
    this.visible = false;
  }

  createLayers() {
    this.createContentLayer();
    // this.createFlashLayer();
    // this.createSelectLayer();
  }

  createContentLayer() {
    this._contentLayer = new Sprite();
    this._contentLayer.bitmap = new Bitmap(this.cardOriginalWidth(), this.cardOriginalHeight());
    this.addChild(this._contentLayer);
  }

  createFlashLayer() {
    this._flashLayer = new Sprite();
    this._flashLayer.bitmap = new Bitmap(this.cardOriginalWidth(), this.cardOriginalHeight());
    this._contentLayer.addChild(this._flashLayer);
  }

  createSelectLayer() {
    this._selectLayer = new Sprite();
    this._selectLayer.bitmap = new Bitmap(this.cardOriginalWidth(), this.cardOriginalHeight());
    this.addChild(this._selectLayer);
  }

  update() {
    if (this.hasActions() && (this.isStopped() || this.isMoving())) this.executeAction();
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
      this._states.forEach(state => state.updateState());
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
    if (this.isStopped() && this.isClosed()) {
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

  calculateInterval(origin, target, duration = 1) {
    return Math.floor(Math.abs(origin - target) / (duration * 60)) || 1;
  }
  
  closed() {
    this.changeState(CardSpriteClosedState);
  }
  
  moving() {
    this.changeState(CardSpriteMovingState);
  }

  close() {
    this.addAction(this.commandClose);
  }
  
  toMove(originPosition, destinationPosition) {
    this.addAction(this.commandMoving, originPosition, destinationPosition);
  }

  commandMoving(originPosition, destinationPosition) {
    if (this.isStopped() && this.isVisible()) {
      this._x = destinationPosition.x;
      this._y = destinationPosition.y;
      this.x = originPosition.x;
      this.y = originPosition.y;
      this.moving();
    }
  }

  commandClose() {
    if (this.isStopped() || this.isOpened()) {
      this._x = this.x + (this.cardOriginalWidth() / 2);
      this.closing();
    }
  }

  isOpened() {
    return this._state instanceof CardSpriteOpenState ||
      this.width === this.cardOriginalWidth();
  }

  closing() {
    this.changeState(CardSpriteClosingState);
  }

  setXPosition(xPosition) {
    this._x = xPosition;
    this.x = xPosition;
  }

  setYPosition(yPosition) {
    this._y = yPosition;
    this.y = yPosition;
  }

  highlight() {
    this.addAction(this.commandHighlight);
  }

  commandHighlight() {
    if (this.isStopped()) {
      this._highlighted = true;
      this.changeState(CardSpriteSelectedState);
    }
  }

  unhighlight() {
    this.addAction(this.commandUnhighlight);
  }

  commandUnhighlight() {
    if (this.isStopped()) {
      this._highlighted = false;
    }
  }

  select() {
    this.addAction(this.commandSelect);
  }

  commandSelect() {
    if (this.isStopped()) {
      this._selected = true;
      this.selected();
    }
  }

  selected() {
    this.changeState(CardSpriteSelectedState);
  }

  unselect() {
    this.addAction(this.commandUnselect);
  }

  commandUnselect() {
    if (this.isStopped()) {
      this._selected = false;
    }
  }

  flash(color, duration) {
    this.addAction(this.commandFlash, color, duration);
  }

  commandFlash(color, duration = 60) {
    if (this.isStopped()) {
      this.drawFlash(color);
      this._flashDuration = duration;
      this.flashed();
    }
  }

  flashed() {
    this.changeState(CardSpriteFlashedState);
  }

  drawFlash(color = 'white') {
    const xPosition = 2;
    const yPosition = 2;
    const width = this.width - 4;
    const height = this.height - 4;
    this._flashLayer.bitmap.clear();
    this._flashLayer.bitmap.fillRect(xPosition, yPosition, width, height, color);
  }

  animationDamage() {
    const animation = this.animationDamager();
    this.addAction(this.commandAnimation, animation);
  }

  commandAnimation(animation) {
    if (this.isStopped()) {
      this._animationSprite = new CardAnimationSprite();
      this._animationSprite.setup([this], animation);
      this.parent.addChild(this._animationSprite);
      this.animated();
    }
  }

  animated() {
    this.changeState(CardSpriteAnimatedState);
  }

  animationDamager() {
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
      quakeEffect: true
    };
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