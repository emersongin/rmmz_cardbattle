class CardSprite extends Sprite {
  initialize() {
    super.initialize();
    // fixs
    this._type = 0;
    this._backgroundColor = '#FFF';
    // bitmaps
    this._figure = null;
    this._backImage = null;
    // states
    this._attackPoints = 0;
    this._healthPoints = 0;
    this._open = false;
    this._opening = false;
    this._closed = true;
    this._closing = false;
    this._stopped = true;
    this._moving = false;
    this._cheering = false;
    this._turnedtoUp = false;
  }
}