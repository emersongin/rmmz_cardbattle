class AlignTextCenterCommandWindowTest extends SceneTest {
  create() {
    const text = [
      'Teste de alinhamento de texto no centro',
      'Teste de alinhamento de texto no centro',
      'Teste de alinhamento de texto no centro',
    ];
    this.subject = CommandWindow.create(0, 0, text);
    this.addWatched(this.subject);
    this.subject.alingTextCenter();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve mostrar o texto alinhado no centro.');
    const aligment = GameConst.CENTER;
    this.assert('Foi desenhando no centro?', this.subject.getTextAlignment()).toBe(aligment.toLowerCase());
  }
}