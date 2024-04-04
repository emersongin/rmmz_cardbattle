class CardSpriteFlashedState {
  _card;
  _duration;
  _flashDuration;
  
  constructor(sprite, color, duration) {
    this._card = sprite;
    this.drawFlash(color);
    this._duration = duration;
    this._flashDuration = duration;
  }

  drawFlash(color = 'white') {
    const layer = this._card._flashedLayer;
    layer.bitmap.clear();
    layer.bitmap.fillAll(color);
  }

  updateState() {
    this.updateFlash();
  }

  updateFlash() {
    const that = this._card;
    const layer = this._card._flashedLayer;
    if (this._flashDuration > 0) {
      this._flashDuration--;
      this.updateFlashOpacity();
    } else {
      layer.bitmap.clear();
      that.removeState(CardStates.FLASHED);
    }
  }

  updateFlashOpacity() {
    const layer = this._card._flashedLayer;
    layer.opacity = (this._flashDuration / this._duration) * 255;
  }
}