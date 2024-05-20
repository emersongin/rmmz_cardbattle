class WindowUpdatedScoreState {
  _window;
  _lastScore = 0;
  _score = 0;
  _toggleFps = 6;
  _interval = 0;
  _counter = GameConst.FPS;
  _blink = false;

  constructor(window, lastScore, score) {
    this._window = window;
    this.restore(lastScore);
    this.newScore(score);
  }

  restore(score) {
    this._lastScore = score;
  }

  newScore(score) {
    this._score = score;
  }

  updateStatus() {
    const that = this._window;
    this.updateBlinkEffect();
    if (this._counter) return this._counter--;
    that.refresh(this._score);
    that.stop();
  }

  updateBlinkEffect() {
    const that = this._window;
    if (!this._blink && this._interval <= this._toggleFps) {
      this._interval++;
      if (this._interval >= this._toggleFps) {
        this._blink = true;
        that.refresh(this._lastScore);
      }
    }
    if (this._blink && this._interval >= 0) {
      this._interval--;
      if (this._interval <= 0) {
        this._blink = false;
        that.refresh(this._score);
      }
    }
  }
}