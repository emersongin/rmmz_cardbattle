class DrawTextEndAlignMiddleSizeTextWindowTest extends SceneTest {
  name = 'DrawTextEndAlignMiddleSizeTextWindowTest';

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
    this.subject.addText(line.repeat(1) + ' 0');
    this.subject.addText(line.repeat(1) + ' 1');
    this.subject.addText(line.repeat(2) + ' 2');
    this.subject.addText(line.repeat(3) + ' 3');
    this.test('Deve alinhar o texto no final!', () => {
      this.subject.setHorizontalAlignContent(GameConst.END);
      this.subject.renderContents();
      this.subject.setCenteredAlignment();
      this.subject.open();
    }, () => {
      const xCenterAlignPrimaryLine = 288;
      const xCenterAlignSecondaryLine = 288;
      const xCenterAlignTertiaryLine = 145;;
      const xCenterAlignQuaternaryLine = 2;
      const yCenterAlignPrimaryLine = 0;
      const yCenterAlignSecondaryLine = 36;
      const yCenterAlignTertiaryLine = 72;
      const yCenterAlignQuaternaryLine = 108;
      this.assertTrue('Foi alinhado no final?', this.subject.isWasTextDrawnPositions(xCenterAlignPrimaryLine, yCenterAlignPrimaryLine));
      this.assertTrue('Foi alinhado no final?', this.subject.isWasTextDrawnPositions(xCenterAlignSecondaryLine, yCenterAlignSecondaryLine));
      this.assertTrue('Foi alinhado no final?', this.subject.isWasTextDrawnPositions(xCenterAlignTertiaryLine, yCenterAlignTertiaryLine));
      this.assertTrue('Foi alinhado no final?', this.subject.isWasTextDrawnPositions(xCenterAlignQuaternaryLine, yCenterAlignQuaternaryLine));
    });
  }
}