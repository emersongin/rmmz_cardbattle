class ChangeBlueColorCommandWindowTest extends SceneTest {
  create() {
    this.subject = CommandWindow.create(0, 0, []);
    this.addWatched(this.subject);
    this.subject.changeBlueColor();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve mostrar janela na cor azul.');
    this.assertTrue('Esta na cor azul?', this.subject.isBlueColor());
  }
}