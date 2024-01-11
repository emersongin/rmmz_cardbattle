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
    this._state = 0;
    this._attackPoints = 0;
    this._healthPoints = 0;
    this._x = this.x;
    this._y = this.y;
    this._turnedtoUp = true;
    // display
    this.attack = 0;
    this.health = 0;
    // 
    this._actions = [];
    this.setup();
  }

  setup() {
    this.setSize();
    this.setBitmap();
    this.stop();
    this.hide();
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

  setBitmap() {
    this.bitmap = new Bitmap(this.width, this.height);
  }

  opened() {
    this._state = CardStates.OPENED;
  }

  hide() {
    this.visible = false;
  }

  update() {
    if (this.hasActions() && this.isStopped()) this.executeAction();
    if (this.isVisibleState() && this.isHidden()) this.show();
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

  hasActions() {
    return this._actions.length > 0;
  }

  isStopped() {
    return this._state === CardStates.STOPPED
  }

  executeAction() {
    const action = this._actions.shift();
    action.execute();
  }

  isVisibleState () {
    return this.isMoving();
  }

  isMoving() {
    return this._state === CardStates.MOVING;
  }

  updateState() {
    switch (this._state) {
      case CardStates.OPENED:
        this.updateOpen();
        break;
      case CardStates.OPENING:
        this.updateOpening();
        break;
      case CardStates.CLOSED:
        this.updateClosed();
        break;
      case CardStates.CLOSING:
        this.updateClosing();
        break;
      case CardStates.STOPPED:
        // nothing
        break;
      case CardStates.MOVING:
        this.updateMoving();
        break;
      case CardStates.ANIMATED:
        // this.updateAnimated();
        break;
      default:
        break;
    }
  }

  updateOpen() {
    this.refreshAndStop();
  }

  refreshAndStop() {
    this.refresh();
    this.stop();
  }

  stop() {
    this._state = CardStates.STOPPED;
  }

  updateOpening() {
    if (this._x !== this.x || this.width < this.cardOriginalWidth()) {
      this.updateOpeningCard();
      this.refresh();
    } else {
      this.opened();
    }
  }

  updateOpeningCard() {
    const interval = this.calculateInterval(0, this.cardOriginalWidth(), 0.5);
    if (this.width < this.cardOriginalWidth()) {
      this.width += (interval * 2);
    }
    if (this._x !== this.x) {
      this.x -= interval;
    }
    if (this.width > this.cardOriginalWidth()) this.width = this.cardOriginalWidth();
    if (this._x > this.x) this.x = this._x;
  }

  calculateInterval(origin, target, duration = 1) {
    return Math.floor(Math.abs(origin - target) / (duration * 60)) || 1;
  }
  
  updateClosing() {
    if (this._x !== this.x || this.width > 0) {
      this.updateClosingCard();
      this.refresh();
    } else {
      this.closed();
    }
  }

  closed() {
    this._state = CardStates.CLOSED;
  }

  updateClosingCard() {
    const interval = this.calculateInterval(0, this.cardOriginalWidth(), 0.5);
    if (this.width > 0) {
      this.width -= (interval * 2);
    }
    if (this._x !== this.x) {
      this.x += interval;
    }
    if (this.width < 0) this.width = 0;
    if (this._x < this.x) this.x = this._x;
  }

  updateClosed() {
    this.refreshAndStop();
  }
  
  updateMoving() {
    if (this._x !== this.x || this._y !== this.y) {
      this.updateMovingPosition();
    } else {
      this.stop();
    }
  }

  moving() {
    this._state = CardStates.MOVING;
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
  
  show() {
    this.refresh();
    this.visible = true;
  }

  isTurnedToUp() {
    return this._turnedtoUp;
  }
  
  addAction(action) {
    this._actions.push(action);
  }

  open() {
    this.addAction({
      execute: () => this.commandOpen()
    });
  }

  close() {
    this.addAction({
      execute: () => this.commandClose()
    });
  }
  
  toMove(originPosition, destinationPosition) {
    this.addAction({
      execute: () => this.commandMoving(originPosition, destinationPosition)
    });
  }

  commandMoving(originPosition, destinationPosition) {
    if (this.isStopped()) {
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
    return this._state === CardStates.CLOSED || 
      this.width === 0;
  }

  opening() {
    this._state = CardStates.OPENING;
  }

  commandClose() {
    if (this.isStopped() || this.isOpened()) {
      this._x = this.x + (this.cardOriginalWidth() / 2);
      this.closing();
    }
  }

  isOpened() {
    return this._state === CardStates.OPENED || 
      this.width === this.cardOriginalWidth();
  }

  closing() {
    this._state = CardStates.CLOSING;
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