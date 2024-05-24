class ChangeRedColorTextWindowTest extends SceneTest {
  create() {
    this.subject = TextWindow.createWindowFullSize(0, 0);
    this.addWatched(this.subject);
    this.subject.changeRedColor();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve mostrar janela na cor vermelha.');
    this.expectTrue('Esta na cor vermelha?', this.subject.isRedColor());
  }
}