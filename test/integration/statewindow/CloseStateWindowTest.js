class CloseStateWindowTest extends SceneTest {
  create() {
    this.subject = StateWindow.createWindowFullSize(0, 0);
    this.addWatched(this.subject);
    this.subject.opened();
    this.subject.close();
  }

  asserts() {
    this.describe('Deve fechar a janela!');
    this.assertTrue('Esta fechada?', this.subject.isClosed());
  }
}