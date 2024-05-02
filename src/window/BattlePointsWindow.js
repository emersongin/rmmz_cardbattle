class BattlePointsWindow extends ValuesWindow {
  reset() {
    this.addValue(GameBattlePointsValues.ATTACK_POINTS, 0);
    this.addValue(GameBattlePointsValues.HEALTH_POINTS, 0);
    super.reset();
  }

  static create(x, y) {
    const width = Graphics.boxWidth / 4;
    const height = CardBattleWindow.minHeight();
    return new GamePointsWindow(new Rectangle(x, y, width, height));
  }

  static createValueUpdate(name, value) {
    return CardBattleWindow.createValueUpdate(name, value);
  }

  refresh() {
    super.refresh();
    this.drawPoints();
  }

  drawPoints() {
    const attack = this.getValueAndconvertToDisplay(GameBattlePointsValues.ATTACK_POINTS);
    const health = this.getValueAndconvertToDisplay(GameBattlePointsValues.HEALTH_POINTS);
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