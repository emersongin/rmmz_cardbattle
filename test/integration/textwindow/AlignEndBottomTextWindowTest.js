class AlignEndBottomTextWindowTest extends SceneTest {
  create() {
    this.subject = TextWindow.createWindowOneFourthSize(0, 0);
    this.addWatched(this.subject);
    this.subject.alignEndBottom();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no final e embaixo!');
    const horizontalAlign = TextWindow.getHorizontalAlign(GameConst.END, this.subject);
    const verticalAlign = TextWindow.getVerticalAlign(GameConst.BOTTOM, this.subject);
    this.expect('Esta na posição horizontal final?', this.subject.x).toBe(horizontalAlign);
    this.expect('Esta na posição vertical embaixo?', this.subject.y).toBe(verticalAlign);
  }
}