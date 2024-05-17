class ChangeRedColorStateWindowTest extends SceneTest {
  create() {
    this.subject = StateWindow.createWindowFullSize(0, 0);
    this.addWatched(this.subject);
    this.subject.alignCenterMiddle();
    this.subject.changeRedColor();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve mudar a cor para vermelha!');
    this.assertTrue('Esta na cor vermelha?', this.subject.isRedColor());
  }
}