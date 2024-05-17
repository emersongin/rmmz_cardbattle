class AlignStartTopStateWindowTest extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = StateWindow.createWindowOneFourthSize(x, y);
    this.addWatched(this.subject);
    this.subject.alignStartTop();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no início e no topo!');
    this.assert('Esta na posição horizontal do início?', this.subject.x).toBe(StateWindow.getHorizontalAlign(GameConst.START, this.subject));
    this.assert('Esta na posição vertical do topo?', this.subject.y).toBe(StateWindow.getVerticalAlign(GameConst.TOP, this.subject));
  }
}