class CreateFullsizeCommandWindowBaseTest extends SceneTest {
  create() {
    this.subject = CommandWindowBase.createWindowFullSize(0, 0);
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve mostrar uma janela com tamanho total!');
    this.assertTrue('Esta aberta no tamanho total?', this.subject.isFullsize());
  }
}