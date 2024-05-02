class DrawTextCenterFullSizeTextWindowTest extends SceneTest {
  name = 'DrawTextCenterFullSizeTextWindowTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = TextWindow.createWindowFullSize(x, y);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.setCenteredPosition();
    this.subject.show();
    this.test('Deve alinhar o texto no centro!', () => {
      this.subject.addText("Hello World");
      this.subject.renderTextCenter();
      this.subject.open();
    }, () => {
      this.assertTrue('Esta com texto alinhado no centro?', this.subject.isCenterAlignedText());
    });
  }
}