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
    const primaryColor = GameColorIndexs.NORMAL_COLOR;
    const sencondColor = GameColorIndexs.SYSTEM_COLOR;
    const thirdColor = GameColorIndexs.CRISIS_COLOR;
    this.test('Deve apresentar o texto com as cores definidas!', () => {
      this.subject.setHorizontalAlignContent(GameConst.CENTER);
      this.subject.changeTextExColor(primaryColor);
      this.subject.appendText("Hello World");
      this.subject.changeTextExColor(sencondColor);
      this.subject.appendText("Hello World");
      this.subject.changeTextExColor(thirdColor);
      this.subject.addTextline("Hello World");
      this.subject.appendText("Hello World");
      this.subject.renderContent();
      this.subject.setCenteredAlignment();
      this.subject.open();
    }, () => {
      this.assertTrue('Esta com testo na cor primaryColor?', this.subject.isColorContentByIndex(primaryColor));
      this.assertTrue('Esta com testo na cor sencondColor?', this.subject.isColorContentByIndex(sencondColor));
      this.assertTrue('Esta com testo na cor thirdColor?', this.subject.isColorContentByIndex(thirdColor));
    });
  }
}