class AlignTopCommandWindowTest extends SceneTest {
  create() {
    this.subject = CommandWindow.create(0, 0, []);
    this.subject.alignTop();
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinha a janela no topo.');
    const y = ScreenHelper.getTopPosition();
    this.expect('Esta na posição vertical do topo?', this.subject.y).toBe(y);
  }
}