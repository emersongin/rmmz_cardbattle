class TextCommandWindowTest extends SceneTest {
  create() {
    const text = [
      'primeiro texto',
      'segundo texto',
      'terceiro texto',
    ];
    this.subject = CommandWindow.create(0, 0, text);
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    const text = [
      'primeiro texto',
      'segundo texto',
      'terceiro texto',
    ];
    this.describe('Deve desenhar o texto na janela.');
    this.assertTrue('Foi desenhado o texto 1?', this.subject.isTextWasDrawing('TEXT_0', text[0]));
    this.assertTrue('Foi desenhado o texto 2?', this.subject.isTextWasDrawing('TEXT_1', text[1]));
    this.assertTrue('Foi desenhado o texto 3?', this.subject.isTextWasDrawing('TEXT_2', text[2]));
  }
}