class AlignBottomCommandWindowTest extends SceneTest {
  create() {
    this.subject = CommandWindow.create(0, 0, []);
    this.subject.alignBottom();
    this.addWatched(this.subject);
    this.subject.open();
  }
  
  asserts() {
    this.describe('Deve alinha a janela embaixo.');
    const positionY = CommandWindow.getVerticalAlign(GameConst.BOTTOM, this.subject, this.scene._windowLayer);
    this.expect('Esta na posição vertical embaixo?', this.subject.y).toBe(positionY);
  }
}