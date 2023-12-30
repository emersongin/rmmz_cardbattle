class CardsetSprite extends Sprite {
  initialize() { 
    super.initialize();
    this._cardSprites = [];
    this.visible = true;
    this.bitmap = new Bitmap(576, 128);
    this.bitmap.fillAll('#567');
  }

  setCards(cards) {
    this.clearContents();
    if (Array.isArray(cards) && cards.length) {
      cards.forEach(card => this.addCard(card));
    }
  }

  clearContents() {
    this._cardSprites.forEach(cardSprite => cardSprite.destroy());
    this._cardSprites = [];
  }

  addCard(card) {
    const cardSprite = new CardSprite();
    cardSprite.setCard(card);
    this.setInitialPosition(cardSprite);
    this.addChild(cardSprite);
    this._cardSprites.push(cardSprite);
  }

  setInitialPosition(cardSprite) {
    const size = this.getSize();
    cardSprite.x = cardSprite.width * size;
    cardSprite.y = 0;
    return cardSprite;
  }

  getSize() {
    return this._cardSprites.length;
  }
}