// include ./state/WindowUpdatedScoreState.js

class ScoreWindow extends CardBattleWindowBase { 
  initialize(rect) {
    super.initialize(rect);
    this.reset();
  }

  reset() {
    this._score = 0;
    this.refresh(this._score);
  }

  refresh(score = 0) {
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

  static create(x, y) {
    const width = Graphics.boxWidth / 4;
    const height = CardBattleWindowBase.minHeight();
    return new ScoreWindow(new Rectangle(x, y, width, height));
  }

  isUpdating() {
    return this.getStatus() instanceof WindowUpdatedScoreState;
  }

  changeScore(score) {
    const lastScore = this._score;
    this._score = score;
    this.changeStatus(WindowUpdatedScoreState, lastScore, score);
  }
}