class UpdatingPointsBoardWindowTest extends SceneTest {
  name = 'UpdatingPointsBoardWindowTest';

  create() {
    this.subject = BoardWindow.createWindowFullSize(0, 0);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.setCenteredPosition();
    this.subject.refresh();
    this.subject.open();
    const updateRedPoints = BoardWindow.createValueUpdate(GameConst.RED_POINTS, 10);
    const updateBluePoints = BoardWindow.createValueUpdate(GameConst.BLUE_POINTS, 10);
    const updateGreenPoints = BoardWindow.createValueUpdate(GameConst.GREEN_POINTS, 10);
    const updateBlackPoints = BoardWindow.createValueUpdate(GameConst.BLACK_POINTS, 10);
    const updateWhitePoints = BoardWindow.createValueUpdate(GameConst.WHITE_POINTS, 10);
    const updateDeckPoints = BoardWindow.createValueUpdate(GameConst.NUM_CARDS_IN_DECK, 10);
    const updateHandPoints = BoardWindow.createValueUpdate(GameConst.NUM_CARDS_IN_HAND, 10);
    const manyUpdates = [
      updateRedPoints,
      updateBluePoints,
      updateGreenPoints,
      updateBlackPoints,
      updateWhitePoints,
      updateDeckPoints,
      updateHandPoints
    ];
    manyUpdates.forEach(update => {
      this.test('Deve atualizar os pontos!', () => {
        this.subject.updateValues(update);
      }, () => {
        this.assertWasTrue('Foi atualizada?', this.subject.isUpdating);
      });
    });
    this.test('Deve atualizar todos os pontos!', () => {
      this.subject.reset();
      this.subject.updateValues(manyUpdates);
    }, () => {
      this.assertWasTrue('Foi atualizada?', this.subject.isUpdating);
    });
  }

}