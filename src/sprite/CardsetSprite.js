class CardsetSprite extends ActionSprite {
  initialize() { 
    super.initialize();
    this._sprites = [];
    this.setSize();
  }

  setSize() {
    this.width = this.contentOriginalWidth();
    this.height = this.contentOriginalHeight();
  }

  contentOriginalWidth() {
    const widthLimit = 576;
    const paddingLimit = 5;
    return widthLimit + paddingLimit;
  }

  contentOriginalHeight() {
    const heightLimit = 128;
    return heightLimit;
  }

  static create() {
    const cardset = new CardsetSprite();
    return cardset;
  }

  startPosition(xPosition, yPosition) {
    this.x = xPosition || this.x;
    this.y = yPosition || this.y;
  }

  setBackgroundColor(color) {
    this.bitmap = new Bitmap(this.contentOriginalWidth(), this.contentOriginalHeight());
    this.bitmap.fillAll(color || 'white');
  }

  setCards(cards) {
    this.clear();
    const sprites = cards.map(card => this.createCardSprite(card));
    this.setSprites(sprites);
    this.addSprites(sprites);
  }

  clear() {
    while (this.children.length) {
      this.children.forEach(async child => {
        await this.removeChild(child);
      });
    }
  }

  createCardSprite(card) {
    const { type, color, figureName, attack, health } = card;
    const sprite = CardSprite.create(type, color, figureName, attack, health);
    return sprite;
  }

  setSprites(sprites) {
    this._cards = sprites;
  }

  addSprites(sprites) {
    sprites.forEach((sprite, index) => {
      sprite.setPosition(0, 0);
      this.addChild(sprite);
    });
  }

  showCards(sprites = this._cards, milliseconds = 0) {
    sprites.forEach((sprite, index) => {
      setTimeout(() => sprite.show(), (milliseconds * index));
    });
  }

  startPositionCards(xPosition, yPosition, sprites = this._cards) {
    sprites.forEach((sprite, index) => {
      sprite.setPosition(xPosition, yPosition);
    });
  }

  startListCards(sprites = this._cards) {
    sprites.forEach((sprite, index) => {
      const { x, y } = this.getChildPosition(index, sprites.length);
      console.log(x, y, index, sprites.length);
      sprite.setPosition(x, y);
    });
  }

  getChildPosition(index = this.children.length, total) {
    index = index;
    const contentWidthLimit = this.contentOriginalWidth();
    return this.getSpriteInitPosition(index, total);
  }

  getSpriteInitPosition(index, total) {
    const spaceBetween = this.spaceBetweenCards(total) * index;
    const x = index ? spaceBetween : 0;
    const y = 0;
    return { x, y };
  }

  spaceBetweenCards(total) {
    const contentLimit = this.contentOriginalWidth();
    total = total || (this.children.length + 1);
    const padding = 1;
    const cardWidth = 96;
    const space = (contentLimit - (padding * total)) / (total || 1);
    return parseInt(Math.ceil(space) < cardWidth ? space : cardWidth + padding) || padding;
  }

  startClosedCards(sprites = this._cards) {
    sprites.forEach((sprite, index) => {
      sprite.startClosed();
    });
  }

  openCards(sprites = this._cards) {
    sprites.forEach((sprite, index) => {
      sprite.open();
    });
  }
}