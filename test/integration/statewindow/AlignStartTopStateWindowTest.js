class AlignStartTopStateWindowTest extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = StateWindow.createWindowOneFourthSize(x, y);
    this.addWatched(this.subject);
    this.subject.alignStartTop();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no início e no topo!');
    const x = ScreenHelper.getStartPosition();
    const y = ScreenHelper.getTopPosition();
    this.expectTrue('Esta na posição horizontal do centro?', this.subject.x === x);
    this.expectTrue('Esta na posição vertical embaixo?', this.subject.y === y);
  }
}