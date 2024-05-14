class SetTextColorTextWindowTest extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = TextWindow.createWindowMiddleSize(x, y);
    this.addWatched(this.subject);
    this.subject.alignCenterMiddle();
    this.subject.show();
    const line = "Hello World";
    const normalColor = TextWindow.appendChangeColor(GameColorIndexs.NORMAL_COLOR); 
    const systemColor = TextWindow.appendChangeColor(GameColorIndexs.SYSTEM_COLOR); 
    this.subject.changeTextColorHere(GameColorIndexs.DAMAGE_COLOR);
    this.subject.addText(`Primeira linha deve ser de cor!`);
    this.subject.changeTextColorHere(GameColorIndexs.NORMAL_COLOR);
    this.subject.addText(`Texto normal${systemColor} mudança de cor${normalColor} texto normal!`);
    this.subject.setHorizontalAlignContent(GameConst.START);
    this.subject.renderContents();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve desenhar o texto com cores diferentes!');
    const assertOne = /^\\c\[(\d+)\](.*)$/;
    const assertTwo = /^\\c\[(\d+)\](.*?)\\c\[(\d+)\](.*?)\\c\[(\d+)\](.*?)!$/;
    const history = this.subject.getHistory();
    const lineOne = history[0].content;
    const lineTwo = history[1].content;
    const validateOne = assertOne.test(lineOne);
    const validateTwo = assertTwo.test(lineTwo);
    this.assertTrue('A primeira linha é colorida?', validateOne);
    this.assertTrue('O texto mudou de cor no centro?', validateTwo);
  }
}