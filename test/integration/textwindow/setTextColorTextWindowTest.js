class SetTextColorTextWindowTest extends SceneTest {
  name = 'SetTextColorTextWindowTest';

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
    const normalColor = TextWindow.appendChangeColor(GameColorIndexs.NORMAL_COLOR); 
    const systemColor = TextWindow.appendChangeColor(GameColorIndexs.SYSTEM_COLOR); 
    this.subject.addText(`Texto${systemColor} Mudar Cor${normalColor} Texto!`);
    this.subject.changeTextColorHere(GameColorIndexs.SYSTEM_COLOR);
    this.test('Deve mudar cor do texto!', () => {
      this.subject.setHorizontalAlignContent(GameConst.START);
      this.subject.renderContents();
      this.subject.setCenteredAlignment();
      this.subject.open();
    }, () => {
      const regex = /^\\c\[0\]Texto\\c\[16\] Mudar Cor\\c\[0\] Texto!$/;
      const line = this.subject.getHistory().shift();
      const content = line.content;
      const validate = regex.test(content);
      this.assertTrue('Texto mudou de cor?', validate);
    });
  }
}