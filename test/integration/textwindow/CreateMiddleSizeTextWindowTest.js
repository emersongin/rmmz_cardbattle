class CreateMiddleSizeTextWindowTest extends SceneTest {
  create() {
    this.subject = TextWindow.createWindowMiddleSize(0, 0);
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve criar uma janela de batalha com tamanho metade da tela!');
    this.expectTrue('Esta na largura metade da tela?', this.subject.isMiddleSize());
  }
}