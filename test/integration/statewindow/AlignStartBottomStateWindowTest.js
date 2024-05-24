class AlignStartBottomStateWindowTest  extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = StateWindow.createWindowOneFourthSize(x, y);
    this.addWatched(this.subject);
    this.subject.alignStartBottom();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no início e embaixo!');
    this.expect('Esta na posição horizontal do início?', this.subject.x).toBe(StateWindow.getHorizontalAlign(GameConst.START, this.subject));
    this.expect('Esta na posição vertical embaixo?', this.subject.y).toBe(StateWindow.getVerticalAlign(GameConst.BOTTOM, this.subject));
  }
}