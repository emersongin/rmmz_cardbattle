class AlignCenterBottomCardBattleWindowBaseTest extends SceneTest {
  name = 'AlignCenterBottomCardBattleWindowBaseTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = CardBattleWindowBase.createWindowOneFourthSize(x, y);
    this.addWatched(this.subject);
  }

  start() {
    this.subject.open();
    this.test('Deve mostrar na posição centro e embaixo!', () => {
      this.subject.alignCenterBottom();
    }, () => {
      this.assert('Esta na posição horizontal do centro?', this.subject.x).toBe(TextWindow.getHorizontalAlign(GameConst.CENTER, this.subject));
      this.assert('Esta na posição vertical embaixo?', this.subject.y).toBe(TextWindow.getVerticalAlign(GameConst.BOTTOM, this.subject));
    });
  }
}