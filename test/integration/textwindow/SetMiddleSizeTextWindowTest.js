class SetMiddleSizeTextWindowTest extends SceneTest {
  name = 'SetMiddleSizeTextWindowTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = TextWindow.createWindowMiddleSize(x, y);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.show();
    this.test('Deve abrir na largura média!', () => {
      this.subject.open();
    }, () => {
      this.assertTrue('Esta na largura média?', this.subject.isMiddleSize());
    });
  }
  
}