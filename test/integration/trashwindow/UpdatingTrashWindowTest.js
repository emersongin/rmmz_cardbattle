class UpdatingTrashWindowTest extends SceneTest {
  name = 'UpdatingTrashWindowTest';

  create() {
    this.subject = TrashWindow.create(0, 0);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.setCenteredAlignment();
    this.subject.refresh();
    this.subject.open();
    const updateCardsNumber = TrashWindow.createValueUpdate(GameConst.NUM_CARDS_IN_TRASH, 10);
    this.test('Deve atualizar os pontos!', () => {
      this.subject.updateValues(updateCardsNumber);
    }, () => {
      this.assertWasTrue('Foi atualizada?', this.subject.isUpdating);
    });
  }
}