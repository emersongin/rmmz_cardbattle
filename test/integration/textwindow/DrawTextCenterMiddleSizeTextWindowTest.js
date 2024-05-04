class DrawTextCenterMiddleSizeTextWindowTest extends SceneTest {
  name = 'DrawTextCenterMiddleSizeTextWindowTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = TextWindow.createWindowMiddleSize(x, y);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.setCenteredAlignment();
    this.subject.show();
    const line = "Hello World";
    this.test('Deve alinhar o texto no centro!', () => {
      this.subject.setHorizontalAlignContent(GameConst.CENTER);
      this.subject.addTextline(line);
      this.subject.addTextline(line);
      this.subject.addTextline(line);
      this.subject.addTextline(line);
      this.subject.renderContent();
      this.subject.setCenteredAlignment();
      this.subject.open();
    }, () => {
      const xAlign = 320.5;
      this.assertTrue('Esta com texto alinhado no centro?', this.subject.isContentCenteredCenter(xAlign));
    });
  }
}