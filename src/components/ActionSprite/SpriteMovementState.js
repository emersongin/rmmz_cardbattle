class SpriteMovementState {
  _sprite;
  _stateFinished;
  _moves;
  _x;
  _y;
  _xInterval;
  _yInterval;
  _duration = 0.3;
  
  constructor(sprite, moves, stateFinished) {
    if (!(sprite instanceof ActionSprite)) {
      throw new Error('sprite is not a ActionSprite instance!');
    }
    this._sprite = sprite;
    this._x = this._sprite.x;
    this._y = this._sprite.y;
    this._moves = moves;
    this._stateFinished = stateFinished
  }

  updateStatus() {
    const that = this._sprite;
    if (this.hasMoves() && this.isStopped()) this.startMove();
    if (this.isToMove()) {
      this.updateXPosition();
      this.updateYPosition();
    } else {
      this.stop();
    }
  }

  stop() {
    this._sprite.changeStatus(this._stateFinished);
  }

  hasMoves() {
    return this._moves.length > 0;
  }

  isStopped() {
    return !this.isToMove();
  }

  startMove() {
    const move = this._moves[0];
    if (move) {
      let { destinyXPosition, destinyYPosition, originXPosition, originYPosition, duration } = move;
      originXPosition = originXPosition || this._sprite.x;
      originYPosition = originYPosition || this._sprite.y;
      duration = duration >= 0 ? duration : this._duration;
      this._x = destinyXPosition;
      this._y = destinyYPosition;
      this._xInterval = NumberHelper.calculateTimeInterval(originXPosition, destinyXPosition, duration);
      this._yInterval = NumberHelper.calculateTimeInterval(originYPosition, destinyYPosition, duration);
      this._moves.shift();
    }
  }

  isToMove() {  
    const that = this._sprite;
    return this._x !== that.x || this._y !== that.y;
  }

  updateXPosition() {
    const that = this._sprite;
    const reached = that.x > this._x;
    if (this._x !== that.x) {
      that.x = reached ? that.x - this._xInterval : that.x + this._xInterval;
    }
    const limit = (reached && that.x < this._x || !reached && that.x > this._x);
    if (limit) that.x = this._x;
  }

  updateYPosition() {
    const that = this._sprite;
    const reached = that.y > this._y;
    if (this._y !== that.y) {
      that.y = reached ? that.y - this._yInterval : that.y + this._yInterval;
    }
    const limit = (reached && that.y < this._y || !reached && that.y > this._y);
    if (limit) that.y = this._y;
  }

}