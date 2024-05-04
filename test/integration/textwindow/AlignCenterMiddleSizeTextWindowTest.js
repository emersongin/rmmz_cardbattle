class AlignCenterMiddleSizeTextWindowTest extends SceneTest {
  name = 'AlignCenterMiddleSizeTextWindowTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = TextWindow.createWindowMiddleSize(x, y);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.show();
    this.test('Deve alinhar no centro!', () => {
      this.subject.setCenteredAlignment();
      this.subject.open();
    }, () => {
      this.assertTrue('Esta alinhado no centro?', this.subject.isCenterAligned());
    });
  }
}