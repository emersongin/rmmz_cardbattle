class AlignEndTopCardBattleWindowBaseTest extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = CardBattleWindowBase.createWindowOneFourthSize(x, y);
    this.addWatched(this.subject);
    this.subject.open();
    this.subject.alignEndTop();
  }

  asserts() {
    this.describe('Deve alinhar no final e no topo!');
    this.assert('Esta na posição horizontal do final?', this.subject.x).toBe(TextWindow.getHorizontalAlign(GameConst.END, this.subject));
    this.assert('Esta na posição vertical do topo?', this.subject.y).toBe(TextWindow.getVerticalAlign(GameConst.TOP, this.subject));
  }
}