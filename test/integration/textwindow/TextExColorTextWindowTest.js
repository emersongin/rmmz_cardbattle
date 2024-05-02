class TextExColorTextWindowTest extends SceneTest {
  name = 'TextExColorTextWindowTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = TextWindow.createWindowFullSize(x, y);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.show();
    const primaryColor = 2;
    const sencondColor = 5;
    const thirdColor = 8;
    this.test('Deve apresentar o texto com a cor definida!', () => {
      this.subject.changeTextColorHere(primaryColor);
      this.subject.appendText("Hello World");
      this.subject.changeTextColorHere(sencondColor);
      this.subject.addText("Hello World");
      this.subject.changeTextColorHere(thirdColor);
      this.subject.appendText("Hello World");
      this.subject.renderTextExCenter();
      this.subject.setCenteredPosition();
      this.subject.open();
    }, () => {
      const textColor = `\\c[${primaryColor}]Hello World\\c[${sencondColor}]\nHello World\\c[${thirdColor}] Hello World`;
      this.assert('Esta renderizado?', this.subject.processText()).toBe(textColor);
    });
  }

}