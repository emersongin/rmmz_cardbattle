class AlignEndBottomStateWindowTest extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = StateWindow.createWindowOneFourthSize(x, y);
    this.addWatched(this.subject);
    this.subject.alignEndBottom();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no final e embaixo!');
    const x = ScreenHelper.getEndPosition(this.subject.width);
    const y = ScreenHelper.getBottomPosition(this.subject.height);
    this.expectTrue('Esta na posição horizontal do centro?', this.subject.x === x);
    this.expectTrue('Esta na posição vertical embaixo?', this.subject.y === y);
  }
}