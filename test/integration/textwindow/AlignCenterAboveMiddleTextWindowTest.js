class AlignCenterAboveMiddleTextWindowTest extends SceneTest {
  create() {
    this.subject = TextWindow.createWindowOneFourthSize(0, 0);
    this.addWatched(this.subject);
    this.subject.alignCenterAboveMiddle();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no centro e acima do meio!');
    const horizontalAlign = TextWindow.getHorizontalAlign(GameConst.CENTER, this.subject);
    const verticalAlign = TextWindow.getVerticalAlign(GameConst.ABOVE_MIDDLE, this.subject);
    this.expect('Esta na posição horizontal centro?', this.subject.x).toBe(horizontalAlign);
    this.expect('Esta na posição vertical acima do meio?', this.subject.y).toBe(verticalAlign);
  }
}