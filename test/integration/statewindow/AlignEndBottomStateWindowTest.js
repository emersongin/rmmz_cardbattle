class AlignEndBottomStateWindowTest extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = StateWindow.createWindowOneFourthSize(x, y);
    this.addWatched(this.subject);
    this.subject.alignEndBottom();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no final e embaixo!');
    this.expect('Esta na posição horizontal do final?', this.subject.x).toBe(StateWindow.getHorizontalAlign(GameConst.END, this.subject));
    this.expect('Esta na posição vertical embaixo?', this.subject.y).toBe(StateWindow.getVerticalAlign(GameConst.BOTTOM, this.subject));
  }
}