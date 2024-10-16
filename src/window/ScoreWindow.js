// include ./state/WindowUpdatedScoreState.js

class ScoreWindow extends StateWindow {
  static create(x, y) {
    const width = Graphics.boxWidth / 4;
    const height = StateWindow.minHeight();
    return new ScoreWindow(new Rectangle(x, y, width, height));
  }

  initialize(rect) {
    super.initialize(rect);
    this._score = 0;
    this.refresh();
  }

  refreshScore(score = 0) {
    this._score = score;
    this.refresh(score);
  }

  refresh(score = this._score) {
    super.refresh();
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

  isUpdating() {
    return this.getStatus() instanceof WindowUpdatedScoreState;
  }

  changeScore(score) {
    this.addAction(this.commandChangeScore, score);
  }

  commandChangeScore(score) {
    if (this.isBusy()) return false;
    const lastScore = this._score;
    this._score = score;
    this.changeStatus(WindowUpdatedScoreState, lastScore, score);
  }
}