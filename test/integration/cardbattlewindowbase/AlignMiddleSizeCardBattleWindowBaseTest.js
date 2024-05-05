class AlignMiddleSizeCardBattleWindowBaseTest extends SceneTest {
  name = 'AlignMiddleSizeCardBattleWindowBaseTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = CardBattleWindowBase.createWindowMiddleSize(x, y);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.open();
    this.test('Deve move para inicio no top!', () => {
      this.subject.setHorizontalAlign(GameConst.START);
      this.subject.setVerticalAlign(GameConst.TOP);
    }, () => {
      this.assert('Esta na posição x?', this.subject.x).toBe(TextWindow.getHorizontalAlign(GameConst.START, this.subject));
      this.assert('Esta na posição y?', this.subject.y).toBe(TextWindow.getVerticalAlign(GameConst.TOP, this.subject));
    });
    this.test('Deve move para inicio no meio!', () => {
      this.subject.setHorizontalAlign(GameConst.START);
      this.subject.setVerticalAlign(GameConst.MIDDLE);
    }, () => {
      this.assert('Esta na posição x?', this.subject.x).toBe(TextWindow.getHorizontalAlign(GameConst.START, this.subject));
      this.assert('Esta na posição y?', this.subject.y).toBe(TextWindow.getVerticalAlign(GameConst.MIDDLE, this.subject));
    });
    this.test('Deve move para inicio embaixo!', () => {
      this.subject.setHorizontalAlign(GameConst.START);
      this.subject.setVerticalAlign(GameConst.BOTTOM);
    }, () => {
      this.assert('Esta na posição x?', this.subject.x).toBe(TextWindow.getHorizontalAlign(GameConst.START, this.subject));
      this.assert('Esta na posição y?', this.subject.y).toBe(TextWindow.getVerticalAlign(GameConst.BOTTOM, this.subject));
    });
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
    this.test('Deve move para final no top!', () => {
      this.subject.setHorizontalAlign(GameConst.END);
      this.subject.setVerticalAlign(GameConst.TOP);
    }, () => {
      this.assert('Esta na posição x?', this.subject.x).toBe(TextWindow.getHorizontalAlign(GameConst.END, this.subject));
      this.assert('Esta na posição y?', this.subject.y).toBe(TextWindow.getVerticalAlign(GameConst.TOP, this.subject));
    });
    this.test('Deve move para final no meio!', () => {
      this.subject.setHorizontalAlign(GameConst.END);
      this.subject.setVerticalAlign(GameConst.MIDDLE);
    }, () => {
      this.assert('Esta na posição x?', this.subject.x).toBe(TextWindow.getHorizontalAlign(GameConst.END, this.subject));
      this.assert('Esta na posição y?', this.subject.y).toBe(TextWindow.getVerticalAlign(GameConst.MIDDLE, this.subject));
    });
    this.test('Deve move para final no embaixo!', () => {
      this.subject.setHorizontalAlign(GameConst.END);
      this.subject.setVerticalAlign(GameConst.BOTTOM);
    }, () => {
      this.assert('Esta na posição x?', this.subject.x).toBe(TextWindow.getHorizontalAlign(GameConst.END, this.subject));
      this.assert('Esta na posição y?', this.subject.y).toBe(TextWindow.getVerticalAlign(GameConst.BOTTOM, this.subject));
    });
  }

}