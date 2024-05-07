class TwoWinsUpdatingScoreWindowTest extends SceneTest {
  name = 'TwoWinsUpdatingScoreWindowTest';

  create() {
    this.subject = ScoreWindow.create(0, 0);
    this.addWatched(this.subject);
  }

  start() {
    this.subject.alignCenterMiddle();
    this.subject.open();
    this.test('Deve atualizar para 2 vitória!', () => {
      this.subject.changeScore(2);
    }, () => {
      this.assertWasTrue('Foi atualizada?', this.subject.isUpdating);
    });
  }
}