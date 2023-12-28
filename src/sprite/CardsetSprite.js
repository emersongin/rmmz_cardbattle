class CardsetSprite extends Sprite {
  initialize() { 
    super.initialize();
    this._cards = [];
  }

  makeCard(card) {
    const card = new CardSprite();
    this.addChild(card);
    this._cards.push(card);
  }

}