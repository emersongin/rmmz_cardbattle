class BattlePointsWindow extends ValuesWindow {
  _lastTextUpdate = '';

  static create(x, y) {
    const width = ScreenHelper.getOneFourthWidth();
    const height = StateWindow.minHeight();
    return new BattlePointsWindow(new Rectangle(x, y, width, height));
  }

  static createValueUpdate(name, value) {
    return ValuesWindow.createValueUpdate(name, value);
  }

  initialize(rect) {
    super.initialize(rect);
    this.reset();
  }

  reset() {
    super.reset();
    this.refreshPoints();
  }

  refreshPoints() {
    this.addValue(GameConst.ATTACK_POINTS, 0);
    this.addValue(GameConst.HEALTH_POINTS, 0);
    this.refresh();
  }

  refresh() {
    super.refresh();
    this.drawPoints();
  }

  drawPoints() {
    const attack = this.getValueAndConvertToDisplay(GameConst.ATTACK_POINTS);
    const health = this.getValueAndConvertToDisplay(GameConst.HEALTH_POINTS);
    const pointsText = `AP ${attack} HP ${health}`;
    this.drawText(pointsText);
    this.addTextLastUpdate(pointsText);
  }

  drawText(text) {
    this.contents.drawText(text, 0, 0, this.contents.width, this.contents.height);
  }

  addTextLastUpdate(text) {
    this._lastTextUpdate = text;
  }

  isTextLastUpdate(text) {
    return this._lastTextUpdate === text;
  }
}