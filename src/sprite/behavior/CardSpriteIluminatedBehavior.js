class CardSpriteIluminatedBehavior {
  _card;
  _color;
  _intensity;
  _positiveIntensity;
  
  constructor(sprite) {
    this._card = sprite;
    this.setup();
  }

  setup() {
    this._color = '#ffff00';
    this._intensity = 255;
    this._positiveIntensity = false;
  }

  updateBehavior() {
    const color = this._color;
    const intensity = this._intensity;
    this.updateBrightness(color, intensity);
    this.updateIntensity();
  }

  updateIntensity() {
    if (this._intensity <= 255 && !this._positiveIntensity) {
      this._intensity += 6;
      if (this._intensity >= 255) {
        this._positiveIntensity = true;
      }
    }
    if (this._intensity >= 100 && this._positiveIntensity) {
      this._intensity -= 6;
      if (this._intensity <= 100) {
        this._positiveIntensity = false;
      }
    }
  }

  updateBrightness(color, intensity) {
    const layer = this._card._selectedLayer;
    const newColor = this.getBrightness(color, intensity);
    layer.bitmap.clear();
    layer.bitmap.fillAll(newColor);
    layer.bitmap.clearRect(4, 4, this._card.width - 8, this._card.height - 8);
  }

  getBrightness(hex, intensity) {
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);
    let factor = intensity / 255;
    r = Math.round(r * factor);
    g = Math.round(g * factor);
    b = Math.round(b * factor);
    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));
    let resultHex = '#' + (r * 0x10000 + g * 0x100 + b).toString(16).padStart(6, '0');
    return resultHex;
  }
}