class AlignStartMiddleCardBattleWindowBaseTest extends SceneTest {
  name = 'AlignStartMiddleCardBattleWindowBaseTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = CardBattleWindowBase.createWindowOneFourthSize(x, y);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.open();
    this.test('Deve mostrar na posição início e no meio!', () => {
      this.subject.alignStartMiddle();
    }, () => {
      this.assert('Esta na posição horizontal do início?', this.subject.x).toBe(TextWindow.getHorizontalAlign(GameConst.START, this.subject));
      this.assert('Esta na posição vertical do meio?', this.subject.y).toBe(TextWindow.getVerticalAlign(GameConst.MIDDLE, this.subject));
    });
  }
}