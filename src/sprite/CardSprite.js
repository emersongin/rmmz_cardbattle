// include ./state/CardSpriteStoppedState.js
// include ./state/CardSpriteMovingState.js
// include ./state/CardSpriteClosedState.js
// include ./state/CardSpriteOpeningState.js
// include ./state/CardSpriteOpenState.js
// include ./state/CardSpriteClosingState.js
// include ./state/CardSpriteAnimatedState.js
// include ./CardAnimationSprite.js

class CardSprite extends ActionSprite {
  initialize() {
    super.initialize();
    // fixs
    this._type = 0;
    this._color = 0;
    // bitmaps
    this._figure = null;
    this._backImage = null;
    // states
    this._state = null;
    this._attackPoints = 0;
    this._healthPoints = 0;
    this._x = this.x;
    this._y = this.y;
    this._highlighted = false;
    this._selected = false;
    this._turnedtoUp = true;
    this._disabled = false;
    this._flashDuration = 0;
    // display
    this.attack = 0;
    this.health = 0;
    // layers
    this._backgroundLayer = null;
    this._contentLayer = null;
    this._flashLayer = null;
    this._animationSprite = null;
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
    this._state = new CardSpriteStoppedState(this);
  }

  hide() {
    this.visible = false;
  }

  createLayers() {
    this.createBackgroundLayer();
    this.createContentLayer();
    this.createFlashLayer();
  }

  createBackgroundLayer() {
    this._backgroundLayer = new Sprite();
    this._backgroundLayer.bitmap = new Bitmap(this.cardOriginalWidth(), this.cardOriginalHeight());
    this.addChild(this._backgroundLayer);
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

  update() {
    if (this.hasActions() && this.isStopped()) this.executeAction();
    if ((this.isMoving() || this.isAnimated()) && this.isHidden()) this.show();
    if (this.isVisible()) this.updateState();
    super.update();
    console.log(this._state);
  }

  isVisible() {
    return this.visible;
  }

  isHidden() {
    return !this.isVisible();
  }

  isStopped() {
    return this._state instanceof CardSpriteStoppedState;
  }

  isBusy() {
    return this.isNotStopped() ||
      this.isActiveFlash() || 
      this.hasActions();
  }

  isNotStopped() {
    return !this.isStopped();
  }

  isActiveFlash() {
    return this._flashDuration > 0;
  }

  isMoving() {
    return this._state instanceof CardSpriteMovingState;
  }

  isAnimated() {
    return this._state instanceof CardSpriteAnimatedState;
  }

  updateState() {
    if (this._state) this._state.updateState();
  }

  refreshAndStop() {
    this.refresh();
    this.stop();
  }

  calculateInterval(origin, target, duration = 1) {
    return Math.floor(Math.abs(origin - target) / (duration * 60)) || 1;
  }
  
  closed() {
    this._state = new CardSpriteClosedState(this);
  }
  
  moving() {
    this._state = new CardSpriteMovingState(this);
  }

  refresh() {
    this.drawCard();
  }

  drawCard() {
    this._contentLayer.bitmap.clear();
    if (this.isTurnedToUp()) {
      this.drawCardBackground();
      this.drawCardFigure();
      this.drawCardDisplay();
    } else {
      this.drawCardBack();
    }
  }

  isTurnedToUp() {
    return this._turnedtoUp;
  }

  drawCardBackground() {
    const xPosition = 2;
    const yPosition = 2;
    const width = this.width - 4;
    const height = this.height - 4;
    const color = this.getBackgroundColor();
    this._contentLayer.bitmap.fillRect(xPosition, yPosition, width, height, color);
  }

  getBackgroundColor() {
    switch (this._color) {
      case CardColors.RED:
        return '#ff0000';
        break;
      case CardColors.BLUE:
        return '#0000ff';
        break;
      case CardColors.GREEN:
        return '#00ff00';
        break;
      case CardColors.WHITE:
        return '#ffffff';
        break;
      case CardColors.BLACK:
        return '#000000';
        break;
      default: // BRONW
        return '#a52a2a';
        break;
    }
  }

  drawCardFigure() {
    const contentWidth = this.cardOriginalWidth() - 8;
    const contentHeight = this.cardOriginalHeight() - 28;
    const openPercent = Math.floor((this.width / this.cardOriginalWidth()) * 100);
    const openWidth = Math.floor((contentWidth * openPercent) / 100);
    const figureWidth = openWidth ? this._figure.width : 0;
    const figureHeight = this._figure.height;
    this._contentLayer.bitmap.blt(
      this._figure, 
      0, 
      0, 
      figureWidth, 
      figureHeight,
      4,
      4,
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

  setCard(card) {
    this.setType(card.type);
    this.setColor(card.color);
    this.setFigure(card.figureName);
    this.setBackImage();
    this._attackPoints = card.attack;
    this._healthPoints = card.health;
  }

  setType(type) {
    this._type = type || 1;
  }

  setColor(color) {
    this._color = color || 6;
  }

  setFigure(figureName) {
    this._figure = ImageManager.loadCard(figureName);
    // this._figure = new Bitmap(this.width, this.height);
    // this._figure.fillAll('yellow');
  }

  setBackImage() {
    this._backImage = new Bitmap(this.width, this.height);
    this._backImage.gradientFillRect (0, 0, this.width, this.height, '#555', '#000');
  }
  
  show() {
    this.refresh();
    this.visible = true;
  }

  isTurnedToUp() {
    return this._turnedtoUp;
  }
  
  open() {
    this.addAction(this.commandOpen);
  }

  opened() {
    this._state = new CardSpriteOpenState(this);
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

  commandOpen() {
    if (this.isStopped() && this.isClosed()) {
      this._x = this.x - (this.cardOriginalWidth() / 2);
      this.opening();
    }
  }

  isClosed() {
    return this._state instanceof CardSpriteClosedState || 
      this.width === 0;
  }

  opening() {
    this._state = new CardSpriteOpeningState(this);
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
    this._state = new CardSpriteClosingState(this);
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
    }
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
    }
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
    this._state = new CardSpriteAnimatedState(this);
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
}