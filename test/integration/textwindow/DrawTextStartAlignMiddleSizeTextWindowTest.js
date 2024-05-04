class DrawTextStartAlignMiddleSizeTextWindowTest extends SceneTest {
  name = 'DrawTextStartAlignMiddleSizeTextWindowTest';

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
    this.subject.addText(line.repeat(1) + ' 2');
    this.subject.addText(line.repeat(1) + ' 3');
    this.test('Deve alinhar o texto no início!', () => {
      this.subject.setHorizontalAlignContent(GameConst.START);
      this.subject.renderContents();
      this.subject.setCenteredAlignment();
      this.subject.open();
    }, () => {
      const xStartAlign = 0;
      const yStartAlignPrimaryLine = 0;
      const yStartAlignSecondaryLine = 36;
      const yStartAlignTertiaryLine = 72;
      const yStartAlignQuaternaryLine = 108;
      this.assertTrue('Foi alinhado no início?', this.subject.isWasTextDrawnPositions(xStartAlign, yStartAlignPrimaryLine));
      this.assertTrue('Foi alinhado no início?', this.subject.isWasTextDrawnPositions(xStartAlign, yStartAlignSecondaryLine));
      this.assertTrue('Foi alinhado no início?', this.subject.isWasTextDrawnPositions(xStartAlign, yStartAlignTertiaryLine));
      this.assertTrue('Foi alinhado no início?', this.subject.isWasTextDrawnPositions(xStartAlign, yStartAlignQuaternaryLine));
    });
  }
}