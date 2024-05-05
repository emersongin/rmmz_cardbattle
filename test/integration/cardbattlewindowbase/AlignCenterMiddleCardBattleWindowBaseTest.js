class AlignCenterMiddleCardBattleWindowBaseTest extends SceneTest {
  name = 'AlignCenterMiddleCardBattleWindowBaseTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = CardBattleWindowBase.createWindowOneFourthSize(x, y);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.open();
    this.test('Deve mostrar na posição centro e no meio!', () => {
      this.subject.alignCenterMiddle();
    }, () => {
      this.assert('Esta na posição horizontal do centro?', this.subject.x).toBe(TextWindow.getHorizontalAlign(GameConst.CENTER, this.subject));
      this.assert('Esta na posição vertical do meio?', this.subject.y).toBe(TextWindow.getVerticalAlign(GameConst.MIDDLE, this.subject));
    });
  }
}