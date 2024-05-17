class AlignTextLeftCommandWindowTest extends SceneTest {
  create() {
    const text = [
      'Teste de alinhamento de texto na esquerda',
      'Teste de alinhamento de texto na esquerda',
      'Teste de alinhamento de texto na esquerda',
    ];
    this.subject = CommandWindow.create(0, 0, text);
    this.addWatched(this.subject);
    this.subject.alignTextLeft();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve mostrar o texto alinhado na esquerda.');
    const aligment = GameConst.LEFT;
    this.assert('Foi desenhando na esquerda?', this.subject.getTextAlignment()).toBe(aligment);
  }
}