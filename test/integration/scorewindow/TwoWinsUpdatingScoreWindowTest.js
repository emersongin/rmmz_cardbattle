class TwoWinsUpdatingScoreWindowTest extends SceneTest {
  create() {
    this.subject = ScoreWindow.create(0, 0);
    this.addWatched(this.subject);
    this.subject.alignCenterMiddle();
    this.subject.open();
    this.subject.changeScore(2);
  }

  asserts() {
    this.describe('Deve atualizar a pontuação!');
    this.expectWasTrue('Foi atualizada?', this.subject.isUpdating);
  }
}