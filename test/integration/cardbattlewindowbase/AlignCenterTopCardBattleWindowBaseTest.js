class AlignCenterTopCardBattleWindowBaseTest extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = CardBattleWindowBase.createWindowOneFourthSize(x, y);
    this.addWatched(this.subject);
    this.subject.open();
    this.subject.alignCenterTop();
  }

  asserts() {
    this.describe('Deve alinhar no centro e no topo!');
    this.assert('Esta na posição horizontal do centro?', this.subject.x).toBe(CardBattleWindowBase.getHorizontalAlign(GameConst.CENTER, this.subject));
    this.assert('Esta na posição vertical do topo?', this.subject.y).toBe(CardBattleWindowBase.getVerticalAlign(GameConst.TOP, this.subject));
  }
}