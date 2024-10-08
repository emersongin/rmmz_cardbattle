class CreateOneFourthSizeStateWindowTest extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = StateWindow.createWindowOneFourthSize(x, y);
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve criar uma janela com 1/4 do tamanho da tela!');
    this.expectTrue('Esta na largura de 1/4 da tela?', this.subject.isOneFourthSize());
  }
  
}