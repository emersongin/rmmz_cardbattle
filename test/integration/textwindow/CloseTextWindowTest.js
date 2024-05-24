class CloseTextWindowTest extends SceneTest {
  create() {
    this.subject = TextWindow.createWindowFullSize(0, 0);
    this.addWatched(this.subject);
    this.subject.opened();
    this.subject.close();
  }

  asserts() {
    this.describe('Deve fechar a janela!');
    this.expectTrue('Esta fechada?', this.subject.isClosed());
  }
}