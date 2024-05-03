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
      this.subject.setAlignContent(GameConst.CENTER_ALIGN);
      this.subject.addTextline("Hello World");
      this.subject.addTextline("Hello World");
      this.subject.addTextline("Hello World");
      this.subject.addTextline("Hello World");
      this.subject.renderContent();
      this.subject.open();
    }, () => {
      const xAlign = 332.5;
      this.assertTrue('Esta com texto alinhado no centro?', this.subject.isCenterAlignedText(xAlign));
    });
  }
}