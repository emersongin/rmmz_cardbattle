class AlignStartBottomStateWindowTest  extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = StateWindow.createWindowOneFourthSize(x, y);
    this.addWatched(this.subject);
    this.subject.alignStartBottom();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no início e embaixo!');
    const x = ScreenHelper.getStartPosition();
    const y = ScreenHelper.getBottomPosition(this.subject.height);
    this.expectTrue('Esta na posição horizontal do centro?', this.subject.x === x);
    this.expectTrue('Esta na posição vertical embaixo?', this.subject.y === y);
  }
}