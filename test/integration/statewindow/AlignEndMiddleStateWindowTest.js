class AlignEndMiddleStateWindowTest extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = StateWindow.createWindowOneFourthSize(x, y);
    this.addWatched(this.subject);
    this.subject.alignEndMiddle();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no final e no meio!');
    const x = ScreenHelper.getEndPosition(this.subject.width);
    const y = ScreenHelper.getMiddlePosition(this.subject.height);
    this.expectTrue('Esta na posição horizontal do centro?', this.subject.x === x);
    this.expectTrue('Esta na posição vertical embaixo?', this.subject.y === y);
  }
}