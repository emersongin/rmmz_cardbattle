class PassBoardWindowTest extends SceneTest {
  create() {
    this.subject = BoardWindow.create(0, 0);
    this.addWatched(this.subject);
    this.subject.alignCenterMiddle();
    this.subject.refresh();
    this.subject.open();
    this.subject.pass();
  }

  asserts() {
    this.describe('Deve mostrar a mensagem de passo!');
    this.expectTrue('Foi mostrado a mensagem de passo?', this.subject.isPass());
  }
}