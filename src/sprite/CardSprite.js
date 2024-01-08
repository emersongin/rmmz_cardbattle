class CardSprite extends Sprite {
  initialize() {
    super.initialize();
    // fixs
    this._type = 0;
    this._color = 0;
    // bitmaps
    this._figure = null;
    this._backImage = null;
    // states
    this._attackPoints = 0;
    this._healthPoints = 0;
    this._x = this.x;
    this._y = this.y;
    this._open = true;
    this._opening = false;
    this._closed = true;
    this._closing = false;
    this._stopped = true;
    this._moving = false;
    this._animated = false;
    this._turnedtoUp = true;
    // display
    this.attack = 0;
    this.health = 0;
    this.setup();
  }

  setup() {
    this.visible = true;
    this.setSize();
    this.setBitmap();
  }

  setSize() {
    this.width = 96;
    this.height = 128;
  }

  setBitmap() {
    this.bitmap = new Bitmap(this.width, this.height);
  }

  setCard(card) {
    this._type = this.setType(card.type);
    this._color = this.setColor(card.color);
    this._figure = this.setFigure(card.figureName);
    this._backImage = this.setBackImage();
    this._attackPoints = card.attack;
    this._healthPoints = card.health;
  }

  setType(type) {
    return type || 1;
  }

  setColor(color) {
    return color || 6;
  }

  setFigure(figureName) {
    // this._figure = ImageManager.loadCard(figureName);
  }

  setBackImage() {
    // this._backImage = ImageManager.loadCard('cardback');
  }

  update() {
    if (this._open && this.visible) {
      this.refresh();
      this.updateMoving();
    }
    super.update();
  }

  refresh() {
    this.bitmap.clear();
    this.drawCard();
  }

  drawCard() {
    if (this._turnedtoUp) {
      this.drawBackground();
      this.drawFigure();
      this.drawDisplay();
    } else {
      this.drawBack();
    }
  }

  drawBackground() {
    this.bitmap.fillRect(0, 0, this.width, this.height, this.getBackgroundColor());
  }

  drawFigure() {
    // this.bitmap.blt(this._figure, 0, 0, this._figure.width, this._figure.height, 0, 0);
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
        this.bitmap.drawText(
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
    return 24;
  }

  drawPoints() {
    const attack = this._attackPoints.toString().padStart(2, ' ');
    const health = this._healthPoints.toString().padStart(2, ' ');
    const points = `${attack} / ${health}`;
    this.bitmap.drawText(
      points, 
      this.displayXPosition(), 
      this.displayYPosition(), 
      this.displayWidth(), 
      this.displayHeight(),
      'center'
    );
  }

  drawPowerCaption() {
    this.bitmap.drawText(
      '( P )', 
      this.displayXPosition(), 
      this.displayYPosition(), 
      this.displayWidth(), 
      this.displayHeight(), 
      'center'
    );
  }

  drawBack() {
    this.bitmap.blt(this._backImage, 0, 0, this.width, this.height, 0, 0);
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
      default:
        return '#a52a2a';
        break;
    }
  }

  updateMoving() {
    if (this._x !== this.x || this._y !== this.y) {
      this._moving = true;
      this._stopped = false;
      this.updateMovingPosition();
    } else {
      this._moving = false;
      this._stopped = true;
    }
  }

  updateMovingPosition() {
    const interval = this.calculateInterval(0, Graphics.boxWidth, 0.5);
    const reachedX = this.x > this._x;
    const reachedY = this.y > this._y;
    if (this._x !== this.x) {
      this.x = this.x > this._x ? this.x - interval : this.x + interval;
    }
    if (reachedX && this.x < this._x) this.x = this._x;
    if (!reachedX && this.x > this._x) this.x = this._x;

    if (this._y !== this.y) {
      this.y = this.y > this._y ? this.y - interval : this.y + interval;
    }
    if (reachedY && this.y < this._y) this.y = this._y;
    if (!reachedY && this.y > this._y) this.y = this._y;
  }

  startMoving(originPosition, destinationPosition) {
    this._x = destinationPosition.x;
    this._y = destinationPosition.y;
    this.x = originPosition.x;
    this.y = originPosition.y;
  }

  calculateInterval(origin, target, duration = 1) {
    return Math.floor(Math.abs(origin - target) / (duration * 60));
  }

  show() {
    this.visible = true;
  }

  hidden() {
    this.visible = false;
  }

  setXPosition(xPosition) {
    this._x = xPosition;
    this.x = xPosition;
  }

  setYPosition(yPosition) {
    this._y = yPosition;
    this.y = yPosition;
  }
}