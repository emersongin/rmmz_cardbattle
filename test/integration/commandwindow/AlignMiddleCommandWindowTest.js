class AlignMiddleCommandWindowTest extends SceneTest {
  create() {
    this.subject = CommandWindow.create(0, 0, []);
    this.subject.alignMiddle();
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinha a janela no meio.');
    const positionY = CommandWindow.getVerticalAlign(GameConst.MIDDLE, this.subject, this.scene._windowLayer);
    this.expect('Esta na posição vertical do meio?', this.subject.y).toBe(positionY);
  }
}