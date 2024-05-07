class DrawTextCenterAlignMiddleSizeTextWindowTest extends SceneTest {
  name = 'DrawTextCenterAlignMiddleSizeTextWindowTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = TextWindow.createWindowMiddleSize(x, y);
    this.addWatched(this.subject);
  }

  start() {
    this.subject.alignCenterMiddle();
    this.subject.show();
    const line = "Hello World";
    this.subject.addText(line.repeat(1) + ' 0');
    this.subject.addText(line.repeat(1) + ' 1');
    this.subject.addText(line.repeat(2) + ' 2');
    this.subject.addText(line.repeat(3) + ' 3');
    this.test('Deve alinhar o texto no centro!', () => {
      this.subject.setHorizontalAlignContent(GameConst.CENTER);
      this.subject.renderContents();
      this.subject.open();
    }, () => {
      const xCenterAlignPrimaryLine = 144;
      const xCenterAlignSecondaryLine = 144;
      const xCenterAlignTertiaryLine = 72.5;;
      const xCenterAlignQuaternaryLine = 1;
      const yCenterAlignPrimaryLine = 0;
      const yCenterAlignSecondaryLine = 36;
      const yCenterAlignTertiaryLine = 72;
      const yCenterAlignQuaternaryLine = 108;
      this.assertTrue('Foi alinhado no centro?', this.subject.isWasTextDrawnPositions(xCenterAlignPrimaryLine, yCenterAlignPrimaryLine));
      this.assertTrue('Foi alinhado no centro?', this.subject.isWasTextDrawnPositions(xCenterAlignSecondaryLine, yCenterAlignSecondaryLine));
      this.assertTrue('Foi alinhado no centro?', this.subject.isWasTextDrawnPositions(xCenterAlignTertiaryLine, yCenterAlignTertiaryLine));
      this.assertTrue('Foi alinhado no centro?', this.subject.isWasTextDrawnPositions(xCenterAlignQuaternaryLine, yCenterAlignQuaternaryLine));
    });
  }
}