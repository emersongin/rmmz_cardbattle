class OneWinUpdatingScoreWindowTest extends SceneTest {
  name = 'OneWinUpdatingScoreWindowTest';

  create() {
    this.subject = ScoreWindow.create(0, 0);
    this.addWatched(this.subject);
  }

  start() {
    this.subject.alignCenterMiddle();
    this.subject.open();
    this.test('Deve atualizar para 1 vitória!', () => {
      this.subject.changeScore(1);
    }, () => {
      this.assertWasTrue('Foi atualizada?', this.subject.isUpdating);
    });
  }
}