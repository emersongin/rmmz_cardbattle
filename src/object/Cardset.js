class Cardset {
  constructor(cards) {
    this.setCardset(cards);
  }

  setCardset(cards) {
    if (!Array.isArray(cards) || cards.length <= 0) throw new Error('Invalid cards'); 
    this._cards = cards;
  }
}