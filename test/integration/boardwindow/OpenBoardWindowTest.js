class OpenBoardWindowTest extends SceneTest {
  name = 'OpenBoardWindowTest';

  create() {
    this.subject = BoardWindow.createWindowFullSize(0, 0);
    this.addWindow(this.subject);
  }

  start() {
    this.test('Deve abrir e renderizar!', () => {
      this.subject.setCenteredPosition();
      this.subject.refresh();
      this.subject.open();
    }, () => {
      this.assertTrue('Esta aberta?', this.subject.isOpen());
    });
  }

}