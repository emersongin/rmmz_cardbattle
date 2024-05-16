class AlignTopCommandWindowTest extends SceneTest {
  create() {
    this.subject = CommandWindowBase.create(0, 0);
    this.subject.alignTop();
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinha no topo!');
    this.assert('Esta na posição vertical do topo?', this.subject.y).toBe(CommandWindowBase.getVerticalAlign(GameConst.TOP, this.subject));
  }
}