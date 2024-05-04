class OpenAndCloseTrashWindowTest extends SceneTest {
  name = 'OpenAndCloseTrashWindowTest';

  create() {
    this.subject = TrashWindow.create(0, 0);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.setCenteredAlignment();
    this.subject.refresh();
    this.test('Deve abrir e renderizar!', () => {
      this.subject.open();
    }, () => {
      this.assertTrue('Esta aberta?', this.subject.isOpen());
    });
    this.test('Deve abrir e renderizar!', () => {
      this.subject.close();
    }, () => {
      this.assertTrue('Esta fechada?', this.subject.isClosed());
    });
  }
}