class RefreshAndOpenGamePointsWindowTest extends SceneTest {
  gamePoints;

  create() {
    this.gamePoints = GamePointsWindow.create(0, 0);
    this.gamePoints.setcenteredPosition();
  }

  start() {
    return new Promise(async resolve => {
      await this.timertoTrue(600, () => {
        this.scene.addWindow(this.gamePoints);
        this.gamePoints.refresh();
        this.gamePoints.open();
      });
      await this.timertoTrue(600, () => {
        this.gamePoints.close();
      });
      resolve(true);
    });
  }
}