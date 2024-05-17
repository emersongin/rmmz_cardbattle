class AlignTextRightTextWindowTest extends SceneTest {
  create() {
    const text = [
      'Teste de alinhamento de texto na direita',
      'Teste de alinhamento de texto na direita',
      'Teste de alinhamento de texto na direita',
    ];
    this.subject = TextWindow.createWindowFullSize(0, 0, text);
    this.addWatched(this.subject);
    this.subject.alignTextRight();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve mostrar o texto alinhado na direita.');
    const aligment = GameConst.RIGHT;
    this.assert('Foi desenhando na direita?', this.subject.getTextAlignment()).toBe(aligment);
  }
}