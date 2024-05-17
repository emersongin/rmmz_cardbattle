class AlignStartMiddleStateWindowTest extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = StateWindow.createWindowOneFourthSize(x, y);
    this.addWatched(this.subject);
    this.subject.alignStartMiddle();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no início e no meio!');
    this.assert('Esta na posição horizontal do início?', this.subject.x).toBe(StateWindow.getHorizontalAlign(GameConst.START, this.subject));
    this.assert('Esta na posição vertical do meio?', this.subject.y).toBe(StateWindow.getVerticalAlign(GameConst.MIDDLE, this.subject));
  }
}