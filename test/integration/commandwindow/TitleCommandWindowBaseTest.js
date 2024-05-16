class TitleCommandWindowBaseTest extends SceneTest {
  create() {
    const title = 'TitleCommandWindowBaseTest';
    this.subject = CommandWindowBase.create(0, 0, title);
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    const title = 'TitleCommandWindowBaseTest';
    const recordContent = this.subject.getRecordContent('TITLE');
    this.describe('Deve mostrar o titulo da janela!');
    this.assert('O titulo é igual?', recordContent).toBe(title);
    this.assertTrue('Foi desenhado o titulo?', this.subject.isTitleWasDrawing());
  }
}