class GameBoardWindowUpdatedState {
  _board;
  _red;
  _blue;
  _green;
  _black;
  _white;
  _deck;
  _hand;
  _interval = 0;
  _counter = 0;

  constructor(window, fields = []) {
    this._board = window;
    this.restoreStatus();
    this.processFieldsUpdates(fields);
    this.calculateInterval();
  }

  restoreStatus() {
    this._red = this._board._redPoints;
    this._blue = this._board._bluePoints;
    this._green = this._board._greenPoints;
    this._black = this._board._blackPoints;
    this._white = this._board._whitePoints;
    this._deck = this._board._numCardsInDeck;
    this._hand = this._board._numCardsInHand;
  }

  processFieldsUpdates(fields) {
    fields.forEach(field => {
      const { name, points } = field;
      this.setUpdatePoints(name, points);
    });
  }

  setUpdatePoints(name, points) {
    switch (name) {
      case 'RED':
        this._red = points;
        break;
      case 'BLUE':
        this._blue = points;
        break;
      case 'GREEN':
        this._green = points;
        break;
      case 'BLACK':
        this._black = points;
        break;
      case 'WHITE':
        this._white = points;
        break;
      case 'DECK':
        this._deck = points;
        break;
      case 'HAND':
        this._hand = points;
        break;
    }
  }

  calculateInterval() {
    const that = this._board;
    const red = Math.abs(that._redPoints - this._red);
    const blu = Math.abs(that._bluePoints - this._blue);
    const gre = Math.abs(that._greenPoints - this._green);
    const blk = Math.abs(that._blackPoints - this._black);
    const wht = Math.abs(that._whitePoints - this._white);
    const deck = Math.abs(that._numCardsInDeck - this._deck);
    const hand = Math.abs(that._numCardsInHand - this._hand);
    const points = IntegerHelper.findBigger(red, blu, gre, blk, wht, deck, hand);
    const fps = 30;
    this._interval = Math.floor(fps / (points || 1)) || 1;
  }

  updateStatus() {
    const that = this._board;
    if (this._counter) return this._counter--;
    if (this.isToUpdate()) {
      if (this.isToUpdateRed()) {
        that._redPoints = this.getUpdatePoints(this._red, that._redPoints);
      }
      if (this.isToUpdateBlue()) {
        that._bluePoints = this.getUpdatePoints(this._blue, that._bluePoints);
      }
      if (this.isToUpdateGreen()) {
        that._greenPoints = this.getUpdatePoints(this._green, that._greenPoints);
      }
      if (this.isToUpdateBlack()) {
        that._blackPoints = this.getUpdatePoints(this._black, that._blackPoints);
      }
      if (this.isToUpdateWhite()) {
        that._whitePoints = this.getUpdatePoints(this._white, that._whitePoints);
      }
      if (this.isToUpdateDeck()) {
        that._numCardsInDeck = this.getUpdatePoints(this._deck, that._numCardsInDeck);
      }
      if (this.isToUpdateHand()) {
        that._numCardsInHand = this.getUpdatePoints(this._hand, that._numCardsInHand);
      }
      that.refresh();
      this._counter = this._interval;
    } else {
      that.stop();
    }
  }

  getUpdatePoints(updatePoints, points) {
    return points > updatePoints ? points - 1 : points + 1;
  }

  isToUpdate() {
    return this.isToUpdateRed() || 
      this.isToUpdateBlue() ||
      this.isToUpdateGreen() ||
      this.isToUpdateBlack() ||
      this.isToUpdateWhite() ||
      this.isToUpdateDeck() ||
      this.isToUpdateHand();
  }

  isToUpdateRed() {
    return this._board._redPoints !== this._red;
  }

  isToUpdateBlue() {
    return this._board._bluePoints !== this._blue;
  }

  isToUpdateGreen() {
    return this._board._greenPoints !== this._green;
  }

  isToUpdateBlack() {
    return this._board._blackPoints !== this._black;
  }

  isToUpdateWhite() {
    return this._board._whitePoints !== this._white;
  }

  isToUpdateDeck() {
    return this._board._numCardsInDeck !== this._deck;
  }

  isToUpdateHand() {
    return this._board._numCardsInHand !== this._hand;
  }
}