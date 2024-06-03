class AlignStartTopTextWindowTest extends SceneTest {
  create() {
    this.subject = TextWindow.createWindowOneFourthSize(0, 0);
    this.addWatched(this.subject);
    this.subject.alignStartTop();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no início e meio!');
    const x = ScreenHelper.getStartPosition();
    const y = ScreenHelper.getTopPosition();
    this.expectTrue('Esta na posição horizontal centro?', this.subject.x === x);
    this.expectTrue('Esta na posição vertical abaixo do meio?', this.subject.y === y);
  }
}