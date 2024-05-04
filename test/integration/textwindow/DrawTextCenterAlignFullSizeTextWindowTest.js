class DrawTextCenterAlignFullSizeTextWindowTest extends SceneTest {
  name = 'DrawTextCenterAlignFullSizeTextWindowTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = TextWindow.createWindowFullSize(x, y);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.setCenteredAlignment();
    this.subject.show();
    const line = "Hello World";
    this.subject.addText(line.repeat(1) + ' 0');
    this.subject.addText(line.repeat(5) + ' 1');
    this.subject.addText(line.repeat(3) + ' 2');
    this.subject.addText(line.repeat(2) + ' 3');
    this.test('Deve alinhar o texto no início!', () => {
      this.subject.setHorizontalAlignContent(GameConst.CENTER);
      this.subject.renderContents();
      this.subject.setCenteredAlignment();
      this.subject.open();
    }, () => {
      const xCenterAlignPrimaryLine = 307.5;
      const xCenterAlignSecondaryLine = 21.5;
      const xCenterAlignTertiaryLine = 164.5;;
      const xCenterAlignQuaternaryLine = 236;
      const yCenterAlignPrimaryLine = 0;
      const yCenterAlignSecondaryLine = 36;
      const yCenterAlignTertiaryLine = 72;
      const yCenterAlignQuaternaryLine = 108;
      this.assertTrue('Foi alinhado no início?', this.subject.isWasTextDrawnPositions(xCenterAlignPrimaryLine, yCenterAlignPrimaryLine));
      this.assertTrue('Foi alinhado no início?', this.subject.isWasTextDrawnPositions(xCenterAlignSecondaryLine, yCenterAlignSecondaryLine));
      this.assertTrue('Foi alinhado no início?', this.subject.isWasTextDrawnPositions(xCenterAlignTertiaryLine, yCenterAlignTertiaryLine));
      this.assertTrue('Foi alinhado no início?', this.subject.isWasTextDrawnPositions(xCenterAlignQuaternaryLine, yCenterAlignQuaternaryLine));
    });
  }
}