class CreateMiddleSizeStateWindowTest extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = StateWindow.createWindowMiddleSize(x, y);
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve criar uma janela de batalha com tamanho metade da tela!');
    this.expectTrue('Esta na largura metade da tela?', this.subject.isMiddleSize());
  }
  
}