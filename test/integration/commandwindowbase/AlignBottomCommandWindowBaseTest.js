class AlignBottomCommandWindowBaseTest extends SceneTest {
  create() {
    this.subject = CommandWindowBase.createWindowFullSize(0, 0);
    this.subject.alignBottom();
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinha embaixo!');
    this.assert('Esta na posição vertical embaixo?', this.subject.y).toBe(CommandWindowBase.getVerticalAlign(GameConst.BOTTOM, this.subject));
  }
}