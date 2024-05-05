class AlignFullSizeCardBattleWindowBaseTest extends SceneTest {
  name = 'AlignFullSizeCardBattleWindowBaseTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = CardBattleWindowBase.createWindowFullSize(x, y);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.open();
    this.test('Deve move para centro no top!', () => {
      this.subject.setHorizontalAlign(GameConst.CENTER);
      this.subject.setVerticalAlign(GameConst.TOP);
    }, () => {
      this.assert('Esta na posição x?', this.subject.x).toBe(TextWindow.getHorizontalAlign(GameConst.CENTER, this.subject));
      this.assert('Esta na posição y?', this.subject.y).toBe(TextWindow.getVerticalAlign(GameConst.TOP, this.subject));
    });
    this.test('Deve move para centro no meio!', () => {
      this.subject.setCenteredAlignment();
    }, () => {
      this.assert('Esta na posição x?', this.subject.x).toBe(TextWindow.getHorizontalAlign(GameConst.CENTER, this.subject));
      this.assert('Esta na posição y?', this.subject.y).toBe(TextWindow.getVerticalAlign(GameConst.MIDDLE, this.subject));
    });
    this.test('Deve move para centro embaixo!', () => {
      this.subject.setHorizontalAlign(GameConst.CENTER);
      this.subject.setVerticalAlign(GameConst.BOTTOM);
    }, () => {
      this.assert('Esta na posição x?', this.subject.x).toBe(TextWindow.getHorizontalAlign(GameConst.CENTER, this.subject));
      this.assert('Esta na posição y?', this.subject.y).toBe(TextWindow.getVerticalAlign(GameConst.BOTTOM, this.subject));
    });
  }
}