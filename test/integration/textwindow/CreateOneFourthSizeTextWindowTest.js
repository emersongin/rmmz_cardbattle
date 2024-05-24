class CreateOneFourthSizeTextWindowTest extends SceneTest {
  create() {
    this.subject = TextWindow.createWindowOneFourthSize(0, 0);
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve criar uma janela com 1/4 do tamanho da tela!');
    this.expectTrue('Esta na largura de 1/4 da tela?', this.subject.isOneFourthSize());
  }
}