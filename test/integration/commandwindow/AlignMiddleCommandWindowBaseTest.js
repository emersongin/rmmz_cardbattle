class AlignMiddleCommandWindowBaseTest extends SceneTest {
  create() {
    this.subject = CommandWindowBase.create(0, 0);
    this.subject.alignMiddle();
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinha no meio!');
    this.assert('Esta na posição vertical do meio?', this.subject.y).toBe(CommandWindowBase.getVerticalAlign(GameConst.MIDDLE, this.subject));
  }
}