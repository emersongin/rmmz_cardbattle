class OpenAndCloseGameBoardWindowTest extends SceneTest {
  gameboard;

  create() {
    this.gameboard = GameBoardWindow.createWindowFullSize(0, 0);
    const maxDown = 9;
    this.gameboard.setVerticalPosition(maxDown);
  }

  start() {
    return new Promise(async resolve => {
      await this.timertoTrue(600, () => {
        this.scene.addWindow(this.gameboard);
        this.gameboard.open();
      });
      await this.timertoTrue(600, () => {
        this.gameboard.close();
      });
      resolve(true);
    });
  }
}