class AlignStartMiddleTextWindowTest extends SceneTest {
  create() {
    this.subject = TextWindow.createWindowOneFourthSize(0, 0);
    this.addWatched(this.subject);
    this.subject.alignStartMiddle();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no início e meio!');
    const horizontalAlign = TextWindow.getHorizontalAlign(GameConst.START, this.subject);
    const verticalAlign = TextWindow.getVerticalAlign(GameConst.MIDDLE, this.subject);
    this.expect('Esta na posição horizontal início?', this.subject.x).toBe(horizontalAlign);
    this.expect('Esta na posição vertical meio?', this.subject.y).toBe(verticalAlign);
  }
}