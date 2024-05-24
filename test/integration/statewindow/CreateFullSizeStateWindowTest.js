class CreateFullSizeStateWindowTest extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = StateWindow.createWindowFullSize(x, y);
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve criar uma janela de batalha com tamanho total da tela!');
    this.expectTrue('Esta na largura total da tela?', this.subject.isFullsize());
  }
}