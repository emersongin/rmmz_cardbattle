class CreateThreeFourthSizeStateWindowTest extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = StateWindow.createWindowThreeFourthSize(x, y);
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve criar uma janela de batalha com 3/4 do tamanho da tela!');
    this.assertTrue('Esta na largura de 3/4 da tela?', this.subject.isThreeFourthSize());
  }
  
}