class ChangeDefaultColorTextWindowTest extends SceneTest {
  create() {
    this.subject = TextWindow.createWindowFullSize(0, 0);
    this.addWatched(this.subject);
    this.subject.changeDefaultColor();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve mostrar janela na cor padrão.');
    this.expectTrue('Esta na cor padrão?', this.subject.isDefaultColor());
  }
}