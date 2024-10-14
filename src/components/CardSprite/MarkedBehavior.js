class MarkedBehavior {
  _sprite;
  _color;
  _layer;
  
  constructor(sprite, layer, color = 'White') {
    this._sprite = sprite;
    this._layer = layer;
    this._color = color;
    this.fillLayer();
  }

  fillLayer() {
    this._layer.bitmap.clear();
    this._layer.bitmap.fillAll(this._color);
    this._layer.bitmap.clearRect(4, 4, this._sprite.width - 8, this._sprite.height - 8);
  }

  updateBehavior() {
    const parent = this._sprite.parent;
    const opacity = parent?._effects?.opacity || this._sprite._effects.opacity;
    this._layer.opacity = opacity;
  }
}