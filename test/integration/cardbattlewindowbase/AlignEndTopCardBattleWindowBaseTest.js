class AlignEndTopCardBattleWindowBaseTest extends SceneTest {
  name = 'AlignEndTopCardBattleWindowBaseTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = CardBattleWindowBase.createWindowOneFourthSize(x, y);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.open();
    this.test('Deve mostrar na posição final e no topo!', () => {
      this.subject.alignEndTop();
    }, () => {
      this.assert('Esta na posição horizontal do final?', this.subject.x).toBe(TextWindow.getHorizontalAlign(GameConst.END, this.subject));
      this.assert('Esta na posição vertical do topo?', this.subject.y).toBe(TextWindow.getVerticalAlign(GameConst.TOP, this.subject));
    });
  }
}