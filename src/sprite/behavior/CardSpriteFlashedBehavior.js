class CardSpriteFlashedBehavior {
  _card;
  _duration;
  _flashDuration = 0;
  _times;
  
  constructor(sprite, color, duration, times) {
    this._card = sprite;
    this.drawFlash(color);
    this._duration = duration;
    this._times = times;
  }

  drawFlash(color = 'white') {
    const layer = this._card._flashedLayer;
    layer.bitmap.clear();
    layer.bitmap.fillAll(color);
  }

  updateBehavior() {
    const that = this._card;
    if (this.isNoPlaying()) {
      if (this.hasTimesOrInfinity()) {
        if (this.hasTimes()) this._times--;
        this._flashDuration = this._duration;
      } else {
        that.removeBehavior(this);
      }
    }
    this.updateFlash();
  }

  hasTimesOrInfinity() {
    const infinity = this._times === -1;
    return this.hasTimes() || infinity;
  }

  hasTimes() {
    return this._times > 0;
  }

  isNoPlaying() {
    return this._flashDuration === 0;
  }

  updateFlash() {
    const that = this._card;
    const layer = this._card._flashedLayer;
    if (this._flashDuration > 0) {
      this._flashDuration--;
      this.updateFlashOpacity();
    } else {
      that._flashedLayer.bitmap.clear();
      that.removeBehavior(this);
    }
  }

  updateFlashOpacity() {
    const layer = this._card._flashedLayer;
    layer.opacity = (this._flashDuration / this._duration) * 255;
  }
}