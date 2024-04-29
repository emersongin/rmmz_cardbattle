class UpdatingPointsGameBoardTest extends SceneTest {
  gameboard;

  create() {
    this.gameboard = GameBoardWindow.createWindowFullSize(0, 0);
    this.gameboard.setcenteredPosition();
  }

  start() {
    return new Promise(async resolve => {
      this.scene.addWindow(this.gameboard);
      this.gameboard.refresh();
      this.gameboard.open();
      const updateRedPoints = GameBoardWindow.createValueUpdate(GameBoardValues.RED_POINTS, 10);
      const updateBluePoints = GameBoardWindow.createValueUpdate(GameBoardValues.BLUE_POINTS, 10);
      const updateGreenPoints = GameBoardWindow.createValueUpdate(GameBoardValues.GREEN_POINTS, 10);
      const updateBlackPoints = GameBoardWindow.createValueUpdate(GameBoardValues.BLACK_POINTS, 10);
      const updateWhitePoints = GameBoardWindow.createValueUpdate(GameBoardValues.WHITE_POINTS, 10);
      const updateDeckPoints = GameBoardWindow.createValueUpdate(GameBoardValues.NUM_CARDS_IN_DECK, 10);
      const updateHandPoints = GameBoardWindow.createValueUpdate(GameBoardValues.NUM_CARDS_IN_HAND, 10);
      await this.timertoTrue(5000, () => {
        this.gameboard.updateValues(updateWhitePoints);
        this.gameboard.updateValues(updateRedPoints);
        this.gameboard.updateValues(updateBluePoints);
        this.gameboard.updateValues(updateGreenPoints);
        this.gameboard.updateValues(updateBlackPoints);
        this.gameboard.updateValues(updateDeckPoints);
        this.gameboard.updateValues(updateHandPoints);
      });
      await this.timertoTrue(600, () => {
        this.gameboard.reset();
      });
      await this.timertoTrue(1000, () => {
        const manyUpdates = [
          updateRedPoints,
          updateBluePoints,
          updateGreenPoints,
          updateBlackPoints,
          updateWhitePoints,
          updateDeckPoints,
          updateHandPoints
        ];
        this.gameboard.updateValues(manyUpdates);
      });
      await this.timertoTrue(600, () => {
        this.gameboard.close();
      });
      resolve(true);
    });
  }

}