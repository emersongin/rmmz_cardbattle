class AlignStartTopCardBattleWindowBaseTest extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = CardBattleWindowBase.createWindowOneFourthSize(x, y);
    this.addWatched(this.subject);
    this.subject.open();
    this.subject.alignStartTop();
  }

  asserts() {
    this.describe('Deve alinhar no início e no topo!');
    this.assert('Esta na posição horizontal do início?', this.subject.x).toBe(CardBattleWindowBase.getHorizontalAlign(GameConst.START, this.subject));
    this.assert('Esta na posição vertical do topo?', this.subject.y).toBe(CardBattleWindowBase.getVerticalAlign(GameConst.TOP, this.subject));
  }
}