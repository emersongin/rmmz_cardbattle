class AlignStartBottomCardBattleWindowBaseTest  extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = CardBattleWindowBase.createWindowOneFourthSize(x, y);
    this.addWatched(this.subject);
    this.subject.open();
    this.subject.alignStartBottom();
  }

  asserts() {
    this.describe('Deve alinhar no início e embaixo!');
    this.assert('Esta na posição horizontal do início?', this.subject.x).toBe(TextWindow.getHorizontalAlign(GameConst.START, this.subject));
    this.assert('Esta na posição vertical embaixo?', this.subject.y).toBe(TextWindow.getVerticalAlign(GameConst.BOTTOM, this.subject));
  }
}