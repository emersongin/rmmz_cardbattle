class SetTextTextWindowTest extends SceneTest {
  name = 'SetTextTextWindowTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = TextWindow.createWindowMiddleSize(x, y);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.show();
    this.test('Deve apresentar o texto definido!', () => {
      this.subject.addText("Hello World Hello World Hello World Hello World");
      this.subject.addText("Hello World");
      this.subject.addText("Hello World Hello World Hello World");
      this.subject.renderTextEx();
      this.subject.setCenteredPosition();
      this.subject.open();
    }, () => {
      const text = "Hello World Hello World Hello World Hello World\nHello World\nHello World Hello World Hello World";
      this.assert('Esta renderizado?', this.subject.processText()).toBe(text);
    });
  }

}