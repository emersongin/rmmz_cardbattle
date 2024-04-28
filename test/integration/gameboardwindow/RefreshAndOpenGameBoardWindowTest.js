class RefreshAndOpenGameBoardWindowTest extends SceneTest {
  gameboard;

  create() {
    this.gameboard = GameBoardWindow.createWindowFullSize(0, 0);
    this.gameboard.setcenteredPosition();
  }

  start() {
    return new Promise(async resolve => {
      await this.timertoTrue(600, () => {
        this.scene.addWindow(this.gameboard);
        this.gameboard.refresh();
        this.gameboard.open();
      });
      await this.timertoTrue(600, () => {
        this.gameboard.close();
      });
      resolve(true);
    });
  }
}