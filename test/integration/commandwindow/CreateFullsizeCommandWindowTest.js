class CreateFullsizeCommandWindowTest extends SceneTest {
  create() {
    this.subject = CommandWindow.create(0, 0, []);
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve exibir a janela com a largura total da tela!');
    this.assertTrue('Esta na largura total da tela?', this.subject.isFullsize());
  }
}