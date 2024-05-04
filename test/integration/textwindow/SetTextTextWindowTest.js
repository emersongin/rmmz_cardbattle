class SetTextTextWindowTest extends SceneTest {
  name = 'SetTextTextWindowTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = TextWindow.createWindowMiddleSize(x, y);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.setCenteredAlignment();
    this.subject.show();
    const line1 = "Hello World Hello World Hello World Hello World";
    const line2 = "Hello World";
    const line3 = "Hello World Hello World Hello World";
    this.test('Deve apresentar o texto definido!', () => {
      this.subject.setHorizontalAlignContent(GameConst.CENTER);
      this.subject.appendText(line1);
      this.subject.appendText(line2);
      this.subject.appendText(line3);
      this.subject.renderContent();
      this.subject.setCenteredAlignment();
      this.subject.open();
    }, () => {
      const [content1, content2, content3] = this.subject.getContent();
      this.assert('Esta renderizado?', content1.text).toBe(line1);
      this.assert('Esta renderizado?', content2.text).toBe('\n'.repeat(1)+line2);
      this.assert('Esta renderizado?', content3.text).toBe('\n'.repeat(2)+line3);
    });
  }

}