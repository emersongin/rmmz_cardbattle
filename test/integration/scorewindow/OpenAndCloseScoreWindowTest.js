class OpenAndCloseScoreWindowTest extends SceneTest {
  name = 'OpenAndCloseScoreWindowTest';

  create() {
    this.subject = ScoreWindow.create(0, 0);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.setCenteredAlignment();
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