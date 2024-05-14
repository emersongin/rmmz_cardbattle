class AlignEndBottomCardBattleWindowBaseTest extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = CardBattleWindowBase.createWindowOneFourthSize(x, y);
    this.addWatched(this.subject);
    this.subject.open();
    this.subject.alignEndBottom();
  }

  asserts() {
    this.describe('Deve alinhar no final e embaixo!');
    this.assert('Esta na posição horizontal do final?', this.subject.x).toBe(CardBattleWindowBase.getHorizontalAlign(GameConst.END, this.subject));
    this.assert('Esta na posição vertical embaixo?', this.subject.y).toBe(CardBattleWindowBase.getVerticalAlign(GameConst.BOTTOM, this.subject));
  }
}