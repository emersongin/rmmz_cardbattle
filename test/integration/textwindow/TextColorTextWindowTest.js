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
    const primaryColor = 2;
    const sencondColor = 5;
    const thirdColor = 8;
    this.test('Deve apresentar o texto com as cores definidas!', () => {
      this.subject.setAlignContent(GameConst.CENTER_ALIGN);
      this.subject.changeTextExColor(primaryColor);
      this.subject.appendText("Hello World");
      this.subject.changeTextExColor(sencondColor);
      this.subject.appendText("Hello World");
      this.subject.changeTextExColor(thirdColor);
      this.subject.addTextline("Hello World");
      this.subject.appendText("Hello World");
      this.subject.renderContent();
      this.subject.setCenteredPosition();
      this.subject.open();
    }, () => {
      this.assertTrue('Esta com testo na cor primaryColor?', this.subject.isSetColorContent(primaryColor));
      this.assertTrue('Esta com testo na cor sencondColor?', this.subject.isSetColorContent(sencondColor));
      this.assertTrue('Esta com testo na cor thirdColor?', this.subject.isSetColorContent(thirdColor));
    });
  }
}