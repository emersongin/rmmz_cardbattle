class AlignStartBottomTextWindowTest extends SceneTest {
  create() {
    this.subject = TextWindow.createWindowOneFourthSize(0, 0);
    this.addWatched(this.subject);
    this.subject.alignStartBottom();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no início e embaixo!');
    const horizontalAlign = TextWindow.getHorizontalAlign(GameConst.START, this.subject);
    const verticalAlign = TextWindow.getVerticalAlign(GameConst.BOTTOM, this.subject);
    this.assert('Esta na posição horizontal início?', this.subject.x).toBe(horizontalAlign);
    this.assert('Esta na posição vertical embaixo?', this.subject.y).toBe(verticalAlign);
  }
}