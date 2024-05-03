class BattlePointsWindow extends ValuesWindow {
  reset() {
    this.addValue(GameConst.ATTACK_POINTS, 0);
    this.addValue(GameConst.HEALTH_POINTS, 0);
    super.reset();
  }

  static create(x, y) {
    const width = Graphics.boxWidth / 4;
    const height = ValuesWindow.minHeight();
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
    const attack = this.getValueAndconvertToDisplay(GameConst.ATTACK_POINTS);
    const health = this.getValueAndconvertToDisplay(GameConst.HEALTH_POINTS);
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