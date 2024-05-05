class AlignEndMiddleCardBattleWindowBaseTest extends SceneTest {
  name = 'AlignEndMiddleCardBattleWindowBaseTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = CardBattleWindowBase.createWindowOneFourthSize(x, y);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.open();
    this.test('Deve mostrar na posição final e no meio!', () => {
      this.subject.alignEndMiddle();
    }, () => {
      this.assert('Esta na posição horizontal do final?', this.subject.x).toBe(TextWindow.getHorizontalAlign(GameConst.END, this.subject));
      this.assert('Esta na posição vertical do meio?', this.subject.y).toBe(TextWindow.getVerticalAlign(GameConst.MIDDLE, this.subject));
    });
  }
}