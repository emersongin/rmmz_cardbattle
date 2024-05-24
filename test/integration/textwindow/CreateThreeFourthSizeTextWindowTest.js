class CreateThreeFourthSizeTextWindowTest extends SceneTest {
  create() {
    this.subject = TextWindow.createWindowThreeFourthSize(0, 0);
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve criar uma janela de batalha com 3/4 do tamanho da tela!');
    this.expectTrue('Esta na largura de 3/4 da tela?', this.subject.isThreeFourthSize());
  }
}