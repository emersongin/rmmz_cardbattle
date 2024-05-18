class ChangeDefaultColorCommandWindowTest extends SceneTest {
  create() {
    this.subject = CommandWindow.create(0, 0, []);
    this.addWatched(this.subject);
    this.subject.changeDefaultColor();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve mostrar janela na cor padrão.');
    this.assertTrue('Esta na cor padrão?', this.subject.isDefaultColor());
  }
}