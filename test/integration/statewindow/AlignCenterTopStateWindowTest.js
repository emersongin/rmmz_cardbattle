class AlignCenterTopStateWindowTest extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = StateWindow.createWindowOneFourthSize(x, y);
    this.addWatched(this.subject);
    this.subject.alignCenterTop();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no centro e no topo!');
    const x = ScreenHelper.getCenterPosition(this.subject.width);
    const y = ScreenHelper.getTopPosition();
    this.expectTrue('Esta na posição horizontal do centro?', this.subject.x === x);
    this.expectTrue('Esta na posição vertical embaixo?', this.subject.y === y);
  }
}