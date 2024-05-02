class AlignCenterFullSizeTextWindowTest extends SceneTest {
  name = 'AlignCenterFullSizeTextWindowTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = TextWindow.createWindowFullSize(x, y);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.addText("Hello World!");
    this.subject.renderTextCenter();
    this.subject.show();
    this.test('Deve alinhar no centro!', () => {
      this.subject.setCenteredPosition();
      this.subject.open();
    }, () => {
      this.assertTrue('Esta alinhado no centro?', this.subject.isCenterAlign());
    });
  }
}