class AlignEndTopTextWindowTest extends SceneTest {
  create() {
    this.subject = TextWindow.createWindowOneFourthSize(0, 0);
    this.addWatched(this.subject);
    this.subject.alignEndTop();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no final e topo!');
    const x = ScreenHelper.getEndPosition(this.subject.width);
    const y = ScreenHelper.getTopPosition(this.subject.height);
    this.expectTrue('Esta na posição horizontal centro?', this.subject.x === x);
    this.expectTrue('Esta na posição vertical abaixo do meio?', this.subject.y === y);
  }
}