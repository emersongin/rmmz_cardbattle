class AlignTopCommandWindowTest extends SceneTest {
  create() {
    this.subject = CommandWindow.create(0, 0, []);
    this.subject.alignTop();
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinha a janela no topo.');
    const positionY = CommandWindow.getVerticalAlign(GameConst.TOP, this.subject, this.scene._windowLayer);
    this.expect('Esta na posição vertical do topo?', this.subject.y).toBe(positionY);
  }
}