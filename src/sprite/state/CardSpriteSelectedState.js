class CardSpriteSelectedState {
  _cardSprite;
  
  constructor(cardSprite) {
    this._cardSprite = cardSprite;
  }

  updateState() {
    this.updateSelect();
  }

  updateSelect() {
    const that = this._cardSprite;
    that._selectLayer.bitmap.clear();
    if (that._highlighted || that._selected) {
      this.fillBackground();
      this.updateSelectPulse();
    } else {
      that.changeState(CardSpriteStoppedState);
    }
  }

  fillBackground() {
    const that = this._cardSprite;
    this.fillSelectBackground();
    this.fillHighlightBackground();
  }

  fillSelectBackground() {
    const that = this._cardSprite;
    if (that._highlighted) {
      that._selectLayer.bitmap.fillRect(0, 0, that.width, that.height, 'red');
    }
  }

  fillHighlightBackground() {
    const that = this._cardSprite;
    if (that._highlighted) {
      that._selectLayer.bitmap.fillRect(0, 0, that.width, that.height, 'yellow');
    }
  }

  updateSelectPulse() {
    const that = this._cardSprite;
    that._selectLayer.opacity -= 32;
    if(that._selectLayer.opacity <= 0) {
      that._selectLayer.opacity = 255;
    }
  }
}