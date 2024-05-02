class TextColorTextWindowTest extends SceneTest {
  name = 'TextColorTextWindowTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = TextWindow.createWindowFullSize(x, y);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.show();
    const textColor = "#ff0000";
    this.test('Deve apresentar o texto com a cor definida!', () => {
      this.subject.setTextColor(textColor);
      this.subject.addText("Hello World");
      this.subject.renderTextCenter();
      this.subject.open();
    }, () => {
      this.assert('Esta renderizado?', this.subject.getTextColor()).toBe(textColor);
    });
  }

}