class PassBoardWindowTest extends SceneTest {
  name = 'PassBoardWindowTest';

  create() {
    this.subject = BoardWindow.createWindowFullSize(0, 0);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.setCenteredAlignment();
    this.subject.refresh();
    this.subject.open();
    this.test('Deve mostrar mensagem de pass!', () => {
      this.subject.pass();
    }, () => {
      this.assertTrue('Foi mostrado a mensagem de pass?', this.subject.isPass());
    });
    this.test('Deve retirar mensagem de pass!', () => {
      this.subject.noPass();
    }, () => {
      this.assertTrue('Foi retirada a mensagem de pass?', this.subject.isNoPass());
    });
  }

}