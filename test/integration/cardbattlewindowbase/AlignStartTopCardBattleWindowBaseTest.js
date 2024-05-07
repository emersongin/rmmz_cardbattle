class AlignStartTopCardBattleWindowBaseTest extends SceneTest {
  name = 'AlignStartTopCardBattleWindowBaseTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = CardBattleWindowBase.createWindowOneFourthSize(x, y);
    this.addWatched(this.subject);
  }

  start() {
    this.subject.open();
    this.test('Deve mostrar na posição início e no topo!', () => {
      this.subject.alignStartTop();
    }, () => {
      this.assert('Esta na posição horizontal do início?', this.subject.x).toBe(TextWindow.getHorizontalAlign(GameConst.START, this.subject));
      this.assert('Esta na posição vertical do topo?', this.subject.y).toBe(TextWindow.getVerticalAlign(GameConst.TOP, this.subject));
    });
  }
}