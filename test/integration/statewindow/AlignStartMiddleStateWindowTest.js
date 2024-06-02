class AlignStartMiddleStateWindowTest extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = StateWindow.createWindowOneFourthSize(x, y);
    this.addWatched(this.subject);
    this.subject.alignStartMiddle();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no início e no meio!');
    const x = ScreenHelper.getStartPosition();
    const y = ScreenHelper.getMiddlePosition(this.subject.height);
    this.expectTrue('Esta na posição horizontal do centro?', this.subject.x === x);
    this.expectTrue('Esta na posição vertical embaixo?', this.subject.y === y);
  }
}