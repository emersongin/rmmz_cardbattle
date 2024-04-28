class UpdatingPointsGameBoardTest extends SceneTest {
  gameboard;

  create() {
    this.gameboard = GameBoardWindow.createWindowFullSize(0, 0);
    this.gameboard.setcenteredPosition();
  }

  start() {
    return new Promise(async resolve => {
      const updateRedPoints = GameBoardWindow.createPointsUpdate(10, 'RED');
      const updateBluePoints = GameBoardWindow.createPointsUpdate(10, 'BLUE');
      const updateGreenPoints = GameBoardWindow.createPointsUpdate(10, 'GREEN');
      const updateBlackPoints = GameBoardWindow.createPointsUpdate(10, 'BLACK');
      const updateWhitePoints = GameBoardWindow.createPointsUpdate(10, 'WHITE');
      const updateDeckPoints = GameBoardWindow.createPointsUpdate(10, 'DECK');
      const updateHandPoints = GameBoardWindow.createPointsUpdate(10, 'HAND');
      await this.timertoTrue(5000, () => {
        this.scene.addWindow(this.gameboard);
        this.gameboard.refresh();
        this.gameboard.open();
        this.gameboard.changePoints(updateWhitePoints);
        this.gameboard.changePoints(updateRedPoints);
        this.gameboard.changePoints(updateBluePoints);
        this.gameboard.changePoints(updateGreenPoints);
        this.gameboard.changePoints(updateBlackPoints);
        this.gameboard.changePoints(updateDeckPoints);
        this.gameboard.changePoints(updateHandPoints);
      });
      await this.timertoTrue(600, () => {
        this.gameboard.reset();
      });
      await this.timertoTrue(1000, () => {
        this.scene.addWindow(this.gameboard);
        this.gameboard.refresh();
        this.gameboard.open();
        const manyUpdates = [
          updateRedPoints,
          updateBluePoints,
          updateGreenPoints,
          updateBlackPoints,
          updateWhitePoints,
          updateDeckPoints,
          updateHandPoints
        ];
        this.gameboard.changePoints(manyUpdates);
      });
      await this.timertoTrue(600, () => {
        this.gameboard.close();
      });
      resolve(true);
    });
  }

}