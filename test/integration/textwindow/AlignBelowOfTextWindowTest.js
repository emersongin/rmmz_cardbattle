class AlignBelowOfTextWindowTest extends SceneTest {
  create() {
    const x = ScreenHelper.getCenterPosition(ScreenHelper.getOneFourthWidth());
    const y = ScreenHelper.getMiddlePosition(TextWindow.borderHeight() * 2);
    this.base = TextWindow.createWindowOneFourthSize(x, y);
    this.subject = TextWindow.createWindowOneFourthSize(0, 0);
    this.attachChild(this.base);
    this.addWatched(this.subject);
    this.base.open();
    this.subject.alignBelowOf(this.base);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no centro e abaixo do meio!');
    const y = ScreenHelper.getPositionBelowOf(this.base.y, this.base.height);
    this.expectTrue('Esta na posição vertical abaixo do meio?', this.subject.y === y);
  }
}