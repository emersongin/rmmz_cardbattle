class AlignCenterTopStateWindowTest extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = StateWindow.createWindowOneFourthSize(x, y);
    this.addWatched(this.subject);
    this.subject.alignCenterTop();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no centro e no topo!');
    this.expect('Esta na posição horizontal do centro?', this.subject.x).toBe(StateWindow.getHorizontalAlign(GameConst.CENTER, this.subject));
    this.expect('Esta na posição vertical do topo?', this.subject.y).toBe(StateWindow.getVerticalAlign(GameConst.TOP, this.subject));
  }
}