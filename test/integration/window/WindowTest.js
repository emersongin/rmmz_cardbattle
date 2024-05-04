class Window_BaseTest extends Window_Base {
  updateTone() {
    this.setTone(255, 0, 0);
  }
}

class WindowTest extends SceneTest {
  name = 'WindowTest';

  create() {
    this.subject = new Window_BaseTest(new Rectangle(0, 0, 100, 100));
    this.subject.setTone(255, 0, 0);
    this.addWindow(this.subject);
  }

  start() {
    this.test('Deve abrir e renderizar!', () => {
      this.subject.open();
    }, () => {
      this.assertTrue('Esta aberta?', this.subject.isOpen());
    }, 5);
  }
}