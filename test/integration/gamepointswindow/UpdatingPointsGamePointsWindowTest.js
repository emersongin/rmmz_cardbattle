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
      const attackPoints = 30;
      const healtPoints = 30;
      await this.timertoTrue(2000, () => {
        this.gamePoints.changePoints(attackPoints);
      });
      await this.timertoTrue(600, () => {
        this.gamePoints.reset();
      });
      await this.timertoTrue(2000, () => {
        this.gamePoints.changePoints(undefined, healtPoints);
      });
      await this.timertoTrue(600, () => {
        this.gamePoints.reset();
      });
      await this.timertoTrue(2000, () => {
        this.gamePoints.changePoints(attackPoints, healtPoints);
      });
      await this.timertoTrue(600, () => {
        this.gamePoints.reset();
      });
      resolve(true);
    });
  }

}