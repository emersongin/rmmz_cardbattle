class AlignCenterMiddleTextWindowTest extends SceneTest {
  create() {
    this.subject = TextWindow.createWindowOneFourthSize(0, 0);
    this.addWatched(this.subject);
    this.subject.alignCenterMiddle();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no centro e meio!');
    const horizontalAlign = TextWindow.getHorizontalAlign(GameConst.CENTER, this.subject);
    const verticalAlign = TextWindow.getVerticalAlign(GameConst.MIDDLE, this.subject);
    this.assert('Esta na posição horizontal centro?', this.subject.x).toBe(horizontalAlign);
    this.assert('Esta na posição vertical meio?', this.subject.y).toBe(verticalAlign);
  }
}