class CardSpriteHoveredState {
  _card;
  
  constructor(sprite) {
    this._card = sprite;
    this.fillLayer();
  }

  fillLayer() {
    const that = this._card;
    const layer = this._card._hoveredLayer;
    layer.bitmap.clear();
    layer.bitmap.fillAll('yellow');
    layer.bitmap.clearRect(4, 4, that.width - 8, that.height - 8);
  }

  updateState() {
    this.updatePulse();
  }

  updatePulse() {
    const layer = this._card._hoveredLayer;
    layer.opacity -= 32;
    if (layer.opacity <= 0) {
      layer.opacity = 255;
    }
  }
}