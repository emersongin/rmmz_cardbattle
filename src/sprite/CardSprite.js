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
    this._open = true;
    this._opening = false;
    this._closed = true;
    this._closing = false;
    this._stopped = true;
    this._moving = false;
    this._animated = false;
    this._turnedtoUp = true;
    this.setSize();
  }

  setSize() {
    this.width = 96;
    this.height = 128;
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
    // this._figure = ImageManager.loadPicture(figureName);
  }

  setBackImage() {
    // this._backImage = ImageManager.loadPicture('cardback');
  }

  update() {
    if (this._open) {
      this.refresh();
    }
    super.update();
  }

  refresh() {
    // this.bitmap.clear();
    this.drawCard();
  }

  drawCard() {
    if (this._turnedtoUp) {
      this.drawBackground();
      // this.drawFigure();
      this.drawDisplay();
    } else {
      this.drawBack();
    }
  }

  drawBackground() {
    this.bitmap.fillRect(0, 0, this.width, this.height, this.getBackgroundColor());
  }

  drawFigure() {
    this.bitmap.blt(this._figure, 0, 0, this._figure.width, this._figure.height, 0, 0);
  }

  drawDisplay() {
    switch (this._type) {
      case CardTypes.BATTLE:
          this.drawPoints();
        break;
      case CardTypes.POWER:
        this.bitmap.drawText(
          '( P )', 
          this.displayXPosition(), 
          this.displayYPosition(), 
          this.displayWidth(), 
          this.displayHeight(), 
          'center'
        );
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
    this.bitmap.drawText(
      this._attackPoints, 
      this.displayXPosition(), 
      this.displayYPosition(), 
      this.displayWidth(), 
      this.displayHeight(),
      'left'
    );
    this.bitmap.drawText(
      this._healthPoints, 
      this.displayXPosition(), 
      this.displayYPosition(), 
      this.displayWidth(), 
      this.displayHeight(),
      'right'
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
}