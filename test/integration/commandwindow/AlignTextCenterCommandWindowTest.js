class AlignTextCenterCommandWindowTest extends SceneTest {
  create() {
    const title = 'AlignTextCenterCommandWindowTest';
    this.subject = CommandWindowBase.create(0, 0, title);
    this.addWatched(this.subject);
    this.subject.alignTitleCenter();
    this.subject.open();
  }

  asserts() {
    const title = 'AlignTextCenterCommandWindowTest';
    this.describe('Deve mostrar o titulo da janela no centro!');
    const aligment = GameConst.CENTER.toLowerCase();
    this.assert('Foi desenhando no centro?', this.subject.getTitleTextAlignment()).toBe(aligment);
  }
}