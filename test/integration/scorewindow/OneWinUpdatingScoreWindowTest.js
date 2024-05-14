class OneWinUpdatingScoreWindowTest extends SceneTest {
  create() {
    this.subject = ScoreWindow.create(0, 0);
    this.addWatched(this.subject);
    this.subject.alignCenterMiddle();
    this.subject.open();
    this.subject.changeScore(1);
  }

  asserts() {
    this.describe('Deve atualizar a pontuação!');
    this.assertWasTrue('Foi atualizada?', this.subject.isUpdating);
  }
}