class NoPassBoardWindowTest extends SceneTest {
  name = 'NoPassBoardWindowTest';

  create() {
    this.subject = BoardWindow.createWindowFullSize(0, 0);
    this.addWatched(this.subject);
  }

  start() {
    this.subject.alignCenterMiddle();
    this.subject.refresh();
    this.subject.open();
    this.subject.pass();
    this.test('Deve retirar mensagem de passo!', () => {
      this.subject.noPass();
    }, () => {
      this.assertTrue('Foi retirada a mensagem de passo?', this.subject.isNoPass());
    });
  }

}