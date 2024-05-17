class AlignEndTopTextWindowTest extends SceneTest {
  create() {
    this.subject = TextWindow.createWindowOneFourthSize(0, 0);
    this.addWatched(this.subject);
    this.subject.alignEndTop();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no final e topo!');
    const horizontalAlign = TextWindow.getHorizontalAlign(GameConst.END, this.subject);
    const verticalAlign = TextWindow.getVerticalAlign(GameConst.TOP, this.subject);
    this.assert('Esta na posição horizontal final?', this.subject.x).toBe(horizontalAlign);
    this.assert('Esta na posição vertical topo?', this.subject.y).toBe(verticalAlign);
  }
}