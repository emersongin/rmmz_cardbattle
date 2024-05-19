class OpenTextWindowTest extends SceneTest {
  create() {
    this.subject = TextWindow.createWindowFullSize(0, 0);
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve abrir a janela!');
    this.assertTrue('Esta aberta?', this.subject.isOpen());
  }
}