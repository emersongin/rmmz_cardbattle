class UpdatingPointsBoardWindowTest extends SceneTest {
  create() {
    this.subject = BoardWindow.create(0, 0);
    this.addWatched(this.subject);
    this.subject.alignCenterMiddle();
    this.subject.refresh();
    this.subject.open();
    const updateRedPoints = BoardWindow.createValueUpdate(GameConst.RED, 10);
    const updateBluePoints = BoardWindow.createValueUpdate(GameConst.BLUE, 10);
    const updateGreenPoints = BoardWindow.createValueUpdate(GameConst.GREEN, 10);
    const updateBlackPoints = BoardWindow.createValueUpdate(GameConst.BLACK, 10);
    const updateWhitePoints = BoardWindow.createValueUpdate(GameConst.WHITE, 10);
    const updateDeckPoints = BoardWindow.createValueUpdate(GameConst.CARDS_IN_DECK, 10);
    const updateHandPoints = BoardWindow.createValueUpdate(GameConst.CARDS_IN_HAND, 10);
    const manyUpdates = [
      updateRedPoints,
      updateBluePoints,
      updateGreenPoints,
      updateBlackPoints,
      updateWhitePoints,
      updateDeckPoints,
      updateHandPoints
    ];
    this.subject.reset();
    this.subject.updateValues(manyUpdates);
  }

  asserts() {
    this.describe('Deve atualizar os pontos do tabuleiro!');
    this.expectWasTrue('Foram atualizado?', this.subject.isUpdating);
  }
}