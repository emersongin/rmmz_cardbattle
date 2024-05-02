class OpenAndCloseTextWindowTest extends SceneTest {
  name = 'OpenAndCloseTextWindowTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = TextWindow.createWindowMiddleSize(x, y);
    this.addWindow(this.subject);
  }
  
  start() {
    this.subject.setCenteredPosition();
    this.subject.show();
    this.test('Deve abrir!', () => {
      this.subject.open();
    }, () => {
      this.assertTrue('Esta aberta?', this.subject.isOpen());
    });
    this.test('Deve fechar!', () => {
      this.subject.close();
    }, () => {
      this.assertTrue('Esta fechada?', this.subject.isClosed());
    });
  }

}