class AlignEndMiddleTextWindowTest extends SceneTest {
  create() {
    this.subject = TextWindow.createWindowOneFourthSize(0, 0);
    this.addWatched(this.subject);
    this.subject.alignEndMiddle();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no final e meio!');
    const horizontalAlign = TextWindow.getHorizontalAlign(GameConst.END, this.subject);
    const verticalAlign = TextWindow.getVerticalAlign(GameConst.MIDDLE, this.subject);
    this.assert('Esta na posição horizontal final?', this.subject.x).toBe(horizontalAlign);
    this.assert('Esta na posição vertical meio?', this.subject.y).toBe(verticalAlign);
  }
}