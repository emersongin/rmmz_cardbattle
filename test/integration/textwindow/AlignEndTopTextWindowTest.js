class AlignEndTopTextWindowTest extends SceneTest {
  create() {
    const line1 = 'primeiro texto';
    const line2 = 'segundo texto';
    const line3 = 'terceiro texto';
    const line4 = 'quarto texto';
    const line5 = 'quinto texto';
    const text = [
      [line1, line2, line3],
      [line4],
      line5,
    ];
    this.subject = TextWindow.createWindowFullSize(0, 0, text);
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    const text = [
      'primeiro texto segundo texto terceiro texto',
      'quarto texto',
      'quinto texto',
    ];
    this.describe('Deve apresentar o texto que foi informado em janela.');
    this.assertTrue('Foi desenhado o texto 1?', this.subject.isTextWasDrawing('TEXT_0', text[0]));
    this.assertTrue('Foi desenhado o texto 2?', this.subject.isTextWasDrawing('TEXT_1', text[1]));
    this.assertTrue('Foi desenhado o texto 3?', this.subject.isTextWasDrawing('TEXT_2', text[2]));
  }
}