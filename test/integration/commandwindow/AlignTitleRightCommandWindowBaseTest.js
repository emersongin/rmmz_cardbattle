class AlignTitleRightCommandWindowBaseTest extends SceneTest {
  create() {
    const title = 'AlignTitleRightCommandWindowBaseTest';
    this.subject = CommandWindowBase.create(0, 0, title);
    this.addWatched(this.subject);
    this.subject.alignTitleRight();
    this.subject.open();
  }

  asserts() {
    const title = 'AlignTitleRightCommandWindowBaseTest';
    this.describe('Deve mostrar o titulo da janela no final!');
    const aligment = GameConst.RIGHT.toLowerCase();
    this.assert('Foi desenhando no final?', this.subject.getTitleTextAlignment()).toBe(aligment);
  }
}