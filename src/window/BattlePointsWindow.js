class BattlePointsWindow extends ValuesWindow {
  initialize(rect) {
    super.initialize(rect);
    this.resetPoints();
  }

  resetPoints() {
    this.addValue(GameConst.ATTACK_POINTS, 0);
    this.addValue(GameConst.HEALTH_POINTS, 0);
  }

  reset() {
    super.reset();
    this.resetPoints();
  }

  static create(x, y) {
    const width = Graphics.boxWidth / 4;
    const height = CardBattleWindowBase.minHeight();
    return new BattlePointsWindow(new Rectangle(x, y, width, height));
  }

  static createValueUpdate(name, value) {
    return ValuesWindow.createValueUpdate(name, value);
  }

  refresh() {
    super.refresh();
    this.drawPoints();
  }

  drawPoints() {
    const attack = this.getValueAndConvertToDisplay(GameConst.ATTACK_POINTS);
    const health = this.getValueAndConvertToDisplay(GameConst.HEALTH_POINTS);
    const points = `AP ${attack} HP ${health}`;
    this.contents.drawText(
      points, 
      0, 
      0, 
      this.contents.width, 
      this.contents.height,
      'center'
    );
  }
}