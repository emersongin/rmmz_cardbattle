class CardBattlePlayer {
  _name;
  _level;
  _deck;

  constructor(name, level, deck) {
    this._name = name;
    this._level = level;
    this._deck = deck;
  }

  getName() {
    return this._name;
  }

  getLevel() {
    return this._level;
  }
}