class CardSpriteSelectedBehavior {
  _card;
  
  constructor(sprite) {
    this._card = sprite;
    this.fillLayer();
  }

  fillLayer() {
    const that = this._card;
    const layer = this._card._selectedLayer;
    layer.bitmap.clear();
    layer.bitmap.fillAll('orange');
    layer.bitmap.clearRect(4, 4, that.width - 8, that.height - 8);
  }

  updateBehavior() {
    this.updatePulse();
  }

  updatePulse() {
    const layer = this._card._selectedLayer;
    layer.opacity -= 32;
    if (layer.opacity <= 0) {
      layer.opacity = 255;
    }
  }
}