class ChangeBlueColorStateWindowTest extends SceneTest {
  create() {
    this.subject = StateWindow.createWindowFullSize(0, 0);
    this.addWatched(this.subject);
    this.subject.changeBlueColor();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve mudar a cor para azul!');
    this.expectTrue('Esta na cor azul?', this.subject.isBlueColor());
  }
}