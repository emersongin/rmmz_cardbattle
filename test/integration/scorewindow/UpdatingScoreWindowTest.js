class UpdatingScoreWindowTest extends SceneTest {
  name = 'UpdatingScoreWindowTest';

  create() {
    this.subject = ScoreWindow.create(0, 0);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.setCenteredAlignment();
    this.subject.open();
    this.test('Deve abrir e renderizar!', () => {
      this.subject.updateScore(1);
    }, () => {
      this.assertWasTrue('Foi atualizada?', this.subject.isUpdating);
    }, 2);
    this.test('Deve abrir e renderizar!', () => {
      this.subject.updateScore(2);
    }, () => {
      this.assertWasTrue('Foi atualizada?', this.subject.isUpdating);
    }, 2);
  }
}