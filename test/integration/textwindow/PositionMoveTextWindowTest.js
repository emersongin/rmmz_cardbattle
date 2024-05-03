class PositionMoveTextWindowTest extends SceneTest {
  name = 'PositionMoveTextWindowTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = TextWindow.createWindowMiddleSize(x, y);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.setCenteredPosition();
    this.subject.show();
    this.subject.addTextline("Hello World");
    this.subject.renderContent();
    this.subject.open();
    const maxTop = 0;
    const middle = 4;
    const maxBottom = 9;
    const start = 0;
    const end = 1;
    this.test('Deve move para o topo!', () => {
      this.subject.setHorizontalPosition(start);
      this.subject.setVerticalPosition(maxTop);
    }, () => {
      this.assert('Esta na posição x?', this.subject.x).toBe(TextWindow.getHorizontalPosition(start));
      this.assert('Esta na posição y?', this.subject.y).toBe(TextWindow.getVerticalPosition(maxTop));
    });
    this.test('Deve move para o center!', () => {
      this.subject.setHorizontalPosition(start);
      this.subject.setVerticalPosition(middle);
    }, () => {
      this.assert('Esta na posição x?', this.subject.x).toBe(TextWindow.getHorizontalPosition(start));
      this.assert('Esta na posição y?', this.subject.y).toBe(TextWindow.getVerticalPosition(middle));
    });
    this.test('Deve move para baixo!', () => {
      this.subject.setHorizontalPosition(start);
      this.subject.setVerticalPosition(maxBottom);
    }, () => {
      this.assert('Esta na posição x?', this.subject.x).toBe(TextWindow.getHorizontalPosition(start));
      this.assert('Esta na posição y?', this.subject.y).toBe(TextWindow.getVerticalPosition(maxBottom));
    });
    this.test('Deve move para o final embaixo!', () => {
      this.subject.setHorizontalPosition(end);
      this.subject.setVerticalPosition(maxBottom);
    }, () => {
      this.assert('Esta na posição x?', this.subject.x).toBe(TextWindow.getHorizontalPosition(end));
      this.assert('Esta na posição y?', this.subject.y).toBe(TextWindow.getVerticalPosition(maxBottom));
    });
  }

}