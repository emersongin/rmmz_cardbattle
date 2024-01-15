// include ./state/CardSpriteStoppedState.js
// include ./state/CardSpriteMovingState.js
// include ./state/CardSpriteClosedState.js
// include ./state/CardSpriteOpeningState.js
// include ./state/CardSpriteOpenState.js
// include ./state/CardSpriteClosingState.js

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
    // display
    this.attack = 0;
    this.health = 0;
    // layers
    this._backgroundLayer = null;
    this._contentLayer = null;
    this._flashLayer = null;
    this._actionsLayer = null;
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
    this.createActionsLayer();
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

  createActionsLayer() {
    this._actionsLayer = new Sprite();
    this._actionsLayer.bitmap = new Bitmap(this.cardOriginalWidth(), this.cardOriginalHeight());
    this._contentLayer.addChild(this._actionsLayer);
  }

  update() {
    if (this.hasActions() && this.isStopped()) this.executeAction();
    if (this.isMoving() && this.isHidden()) this.show();
    if (this.isVisible()) this.updateState();
    super.update();
    // console.log(this._state);
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
    return !this.isStopped() || this.hasActions();
  }

  isMoving() {
    return this._state instanceof CardSpriteMovingState;
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
    if (this._turnedtoUp) {
      this.drawBackground();
      this.drawFigure();
      this.drawDisplay();
    } else {
      this.drawBack();
    }
  }

  drawBackground() {
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

  drawFigure() {
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

  drawBack() {
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
}