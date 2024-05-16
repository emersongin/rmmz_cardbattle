class TextCommandWindowTest extends SceneTest {
  create() {
    const text = [
      'primeiro texto para validação de desenho em janela de comando',
      'segundo texto para validação de desenho em janela de comando',
    ];
    this.subject = CommandWindow.create(0, 0, text);
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    const text = [
      'primeiro texto para validação de desenho em janela de comando',
      'segundo texto para validação de desenho em janela de comando',
    ];
    this.describe('Deve apresentar o texto que foi informado em janela.');
    this.assertTrue('Foi desenhado o texto 1?', this.subject.isTextWasDrawing('TEXT_0', text[0]));
    this.assertTrue('Foi desenhado o texto 2?', this.subject.isTextWasDrawing('TEXT_1', text[1]));
  }
}