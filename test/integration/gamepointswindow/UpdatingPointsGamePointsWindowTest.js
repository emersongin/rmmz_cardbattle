class UpdatingPointsGamePointsWindowTest extends SceneTest {
  gamePoints;

  create() {
    this.gamePoints = GamePointsWindow.create(0, 0);
    this.gamePoints.setcenteredPosition();
  }

  start() {
    return new Promise(async resolve => {
      this.scene.addWindow(this.gamePoints);
      this.gamePoints.refresh();
      this.gamePoints.open();
      const updateAttackPoints = GamePointsWindow.createValueUpdate(GameBattlePointsValues.ATTACK_POINTS, 30);
      const updateHealtPoints = GamePointsWindow.createValueUpdate(GameBattlePointsValues.HEALTH_POINTS, 30);
      await this.timertoTrue(1200, () => {
        this.gamePoints.updateValues(updateAttackPoints);
      });
      await this.timertoTrue(1200, () => {
        this.gamePoints.reset();
      });
      await this.timertoTrue(1200, () => {
        this.gamePoints.updateValues(updateHealtPoints);
      });
      await this.timertoTrue(1200, () => {
        this.gamePoints.reset();
      });
      await this.timertoTrue(1200, () => {
        this.gamePoints.updateValues([
          updateAttackPoints,
          updateHealtPoints
        ]);
      });
      await this.timertoTrue(1200, () => {
        this.gamePoints.reset();
      });
      resolve(true);
    });
  }

}