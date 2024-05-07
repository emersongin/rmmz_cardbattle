class PassBoardWindowTest extends SceneTest {
  name = 'PassBoardWindowTest';

  create() {
    this.subject = BoardWindow.createWindowFullSize(0, 0);
    this.addWatched(this.subject);
  }

  start() {
    this.subject.alignCenterMiddle();
    this.subject.refresh();
    this.subject.open();
    this.test('Deve mostrar mensagem de passo!', () => {
      this.subject.pass();
    }, () => {
      this.assertTrue('Foi mostrado a mensagem de passo?', this.subject.isPass());
    });
  }

}