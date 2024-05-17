class NoPassBoardWindowTest extends SceneTest {
  create() {
    this.subject = BoardWindow.create(0, 0);
    this.addWatched(this.subject);
    this.subject.alignCenterMiddle();
    this.subject.refresh();
    this.subject.open();
    this.subject.pass();
    this.subject.noPass();
  }

  asserts() {
    this.describe('Deve passar a mensagem de passo!');
    this.assertTrue('Foi retirada a mensagem de passo?', this.subject.isNoPass());
  }
}