// include ./state/WindowUpdatedScoreState.js

class ScoreWindow extends Window_Base { 
  initialize(rect) {
    super.initialize(rect);
    this._iconset = "IconSet";
    this._status = {};
    this._score = 0;
    this.closed();
    this.stop();
    this.reset();
  }

  closed() {
    this._openness = 0;
  }

  stop() {
    this.changeStatus(WindowStoppedState);
  }

  changeStatus(status, ...params) {
    this._status = new status(this, ...params);
  }

  reset() {
    this._score = 0;
    this.refresh(this._score);
  }

  refresh(score = 0) {
    this.contents.clear();
    this.drawScore(score);
  }

  drawScore(score) {
    const padding = 4;
    const centerX = (this.contents.width / 2) - ((ImageManager.iconWidth * 2) / 2);
    for (let index = 0; index < 2; index++) {
      const x = centerX + (ImageManager.iconWidth + padding) * index;
      const icone = index <= (score - 1) ? IconSetConst.RUBY : IconSetConst.SAPPHIRE;
      this.drawIcon(icone, x, 0);
    }
  }

  drawIcon(iconIndex, x, y) {
    const bitmap = ImageManager.loadSystem(this._iconset);
    const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx = (iconIndex % 16) * pw;
    const sy = Math.floor(iconIndex / 16) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
  };

  static create(x, y) {
    const width = Graphics.boxWidth / 4;
    const height = CardBattleWindowBase.minHeight();
    return new ScoreWindow(new Rectangle(x, y, width, height));
  }

  isUpdating() {
    return this.getStatus() instanceof WindowUpdatedScoreState;
  }

  getStatus() {
    return this._status;
  }

  updateScore(score) {
    const lastScore = this._score;
    this._score = score;
    this.changeStatus(WindowUpdatedScoreState, lastScore, score);
  }

  update() {
    if (this.isOpen() && this.getStatus()) this._status.updateStatus();
    super.update();
  }
}