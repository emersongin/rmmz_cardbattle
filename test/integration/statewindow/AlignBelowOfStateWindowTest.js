class AlignBelowOfStateWindowTest extends SceneTest {
  create() {
    const x = ScreenHelper.getCenterPosition(ScreenHelper.getOneFourthWidth());
    const y = ScreenHelper.getMiddlePosition(StateWindow.borderHeight() * 2);
    this.base = StateWindow.createWindowOneFourthSize(x, y);
    this.subject = StateWindow.createWindowOneFourthSize(0, 0);
    this.attachChild(this.base);
    this.addWatched(this.subject);
    this.base.open();
    this.subject.alignBelowOf(this.base);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no centro e acima do meio!');
    const y = ScreenHelper.getPositionBelowOf(this.base.y, this.base.height);
    this.expectTrue('Esta na posição vertical acima do meio?', this.subject.y === y);
  }
}