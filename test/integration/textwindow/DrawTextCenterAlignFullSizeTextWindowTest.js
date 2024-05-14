class DrawTextCenterAlignFullSizeTextWindowTest extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = TextWindow.createWindowFullSize(x, y);
    this.addWatched(this.subject);
    this.subject.alignCenterMiddle();
    this.subject.show();
    const line = "Hello World";
    this.subject.addText(line.repeat(1) + ' 0');
    this.subject.addText(line.repeat(5) + ' 1');
    this.subject.addText(line.repeat(3) + ' 2');
    this.subject.addText(line.repeat(2) + ' 3');
    this.subject.setHorizontalAlignContent(GameConst.CENTER);
    this.subject.renderContents();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve desenhar o texto alinhado no centro!');
    const xCenterAlignPrimaryLine = 307.5;
    const xCenterAlignSecondaryLine = 21.5;
    const xCenterAlignTertiaryLine = 164.5;;
    const xCenterAlignQuaternaryLine = 236;
    const yCenterAlignPrimaryLine = 0;
    const yCenterAlignSecondaryLine = 36;
    const yCenterAlignTertiaryLine = 72;
    const yCenterAlignQuaternaryLine = 108;
    this.assertTrue('Foi alinhado no centro?', this.subject.isWasTextDrawnPositions(xCenterAlignPrimaryLine, yCenterAlignPrimaryLine));
    this.assertTrue('Foi alinhado no centro?', this.subject.isWasTextDrawnPositions(xCenterAlignSecondaryLine, yCenterAlignSecondaryLine));
    this.assertTrue('Foi alinhado no centro?', this.subject.isWasTextDrawnPositions(xCenterAlignTertiaryLine, yCenterAlignTertiaryLine));
    this.assertTrue('Foi alinhado no centro?', this.subject.isWasTextDrawnPositions(xCenterAlignQuaternaryLine, yCenterAlignQuaternaryLine));
  }
}