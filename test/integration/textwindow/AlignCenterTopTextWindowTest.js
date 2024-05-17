class AlignCenterTopTextWindowTest extends SceneTest {
  create() {
    this.subject = TextWindow.createWindowOneFourthSize(0, 0);
    this.addWatched(this.subject);
    this.subject.alignCenterTop();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no centro e topo!');
    const horizontalAlign = TextWindow.getHorizontalAlign(GameConst.CENTER, this.subject);
    const verticalAlign = TextWindow.getVerticalAlign(GameConst.TOP, this.subject);
    this.assert('Esta na posição horizontal centro?', this.subject.x).toBe(horizontalAlign);
    this.assert('Esta na posição vertical topo?', this.subject.y).toBe(verticalAlign);
  }
}