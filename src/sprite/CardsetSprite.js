class CardsetSprite extends ActionSprite {
  initialize() { 
    super.initialize();
    this._cards = [];
    this.setSize();
  }

  setSize() {
    this.width = this.cardsetOriginalWidth();
    this.height = this.cardsetOriginalHeight();
  }

  cardsetOriginalWidth() {
    const cardsetWidthLimite = 576;
    const cardsetPaddingWidthLimite = 5;
    return cardsetWidthLimite + cardsetPaddingWidthLimite;
  }

  cardsetOriginalHeight() {
    const cardsetHeightLimite = 128;
    return cardsetHeightLimite;
  }

  static create(cards) {
    const cardset = new CardsetSprite();
    cardset.setCards(cards || []);
    return cardset;
  }

  setCards(cards) {
    this._cards = cards.map(card => {
      const { type, color, figureName, attack, health } = card;
      const sprite = CardSprite.create(type, color, figureName, attack, health);
      const status = CardStatus.ADDED;
      const cardStatus = this.createCardStatus(status, sprite);
      return cardStatus;
    });
  }

  createCardStatus(status, sprite) {
    return { status, sprite };
  }

  setBackGroundColor(color) {
    this.bitmap = new Bitmap(this.cardsetOriginalWidth(), this.cardsetOriginalHeight());
    this.bitmap.fillAll(color || 'white');
  }

  startPosition(xPosition, yPosition) {
    this.x = xPosition || this.x;
    this.y = yPosition || this.y;
  }

  presentOpenCards() {
    this.clearContent();
    const sprites = this.getSpritesWithStatus(CardStatus.ADDED);
    this.startCardsClosed(sprites);
    this.openCards(sprites);
  }

  clearContent(sprites) {
    const children = sprites || this.children || [];
    while (children.length) {
      children.forEach(async child => {
        await this.removeChild(child)
      });
    }
  }

  getSpritesWithStatus(cardStatus) {
    const cards = this._cards.filter(({ status }) => status === cardStatus);
    return cards.map(({ sprite }) => sprite);
  }

  startCardsClosed(sprites) {
    const length = this.getChildrenLength() + sprites.length;
    const widthLimit = this.cardsetOriginalWidth();
    sprites.forEach((sprite, index) => {
      const width = sprite.cardOriginalWidth();
      const spaceBetween = this.calculateSpaceBetweenCards(width, length, widthLimit) * index;
      const xPosition = index ? spaceBetween : 0;
      const yPosition = 0;
      sprite.startClosed(xPosition, yPosition);
      this.addChild(sprite);
    });
  }

  getChildrenLength() {
    return this.children.length;
  }

  calculateSpaceBetweenCards(width, length, widthLimit) {
    const padding = 1;
    const space = (widthLimit - (padding * length)) / (length || 1);
    return parseInt(Math.ceil(space) < width ? space : width + padding) || padding;
  }

  openCards(sprites) {
    sprites.forEach((sprite, index) => {
      setTimeout(() =>
        sprite.open()
      , (100 * index));
    });
  }
}