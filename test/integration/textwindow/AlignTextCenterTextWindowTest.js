class AlignTextCenterTextWindowTest extends SceneTest {
  create() {
    const text = [
      'Teste de alinhamento de texto no centro',
      'Teste de alinhamento de texto no centro',
      'Teste de alinhamento de texto no centro',
    ];
    this.subject = TextWindow.createWindowFullSize(0, 0, text);
    this.addWatched(this.subject);
    this.subject.alignTextCenter();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve mostrar o texto alinhado no centro.');
    const aligment = GameConst.CENTER;
    this.expectTrue('Foi desenhando no centro?', this.subject.getTextAlignment() === aligment);
  }
}