class AlignCenterBelowMiddleTextWindowTest  extends SceneTest {
  create() {
    this.subject = TextWindow.createWindowOneFourthSize(0, 0);
    this.addWatched(this.subject);
    this.subject.alignCenterBelowMiddle();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no centro e abaixo do meio!');
    const x = ScreenHelper.getCenterPosition(this.subject.width);
    const y = ScreenHelper.getBelowMiddlePosition(this.subject.height);
    this.expectTrue('Esta na posição horizontal centro?', this.subject.x === x);
    this.expectTrue('Esta na posição vertical abaixo do meio?', this.subject.y === y);
  }
}