class AlignCenterMiddleStateWindowTest extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = StateWindow.createWindowOneFourthSize(x, y);
    this.addWatched(this.subject);
    this.subject.alignCenterMiddle();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no centro e no meio!');
    this.assert('Esta na posição horizontal do centro?', this.subject.x).toBe(StateWindow.getHorizontalAlign(GameConst.CENTER, this.subject));
    this.assert('Esta na posição vertical do meio?', this.subject.y).toBe(StateWindow.getVerticalAlign(GameConst.MIDDLE, this.subject));
  }
}