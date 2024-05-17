class ChangeTextColorCommandWindowTest extends SceneTest {
  create() {
    const line1 = 'primeiro texto';
    let line2 = 'segundo texto';
    line2 = CommandWindow.setTextColor(line2, GameColorIndexs.BLUE);
    let line3 = 'terceiro texto';
    line3 = CommandWindow.setTextColor(line3, GameColorIndexs.DEFAULT);
    const line4 = 'quarto texto';
    const line5 = 'quinto texto';
    const text = [
      [line1, line2, line3],
      line4,
      line5,
    ];
    this.subject = CommandWindow.create(0, 0, text);
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
    this.assertTrue('Foi alterado a cor do texto?', this.subject.isTextWasDrawing('COLOR_0', GameColorIndexs.BLUE));
    this.assertTrue('Foi alterado a cor do texto?', this.subject.isTextWasDrawing('COLOR_1', GameColorIndexs.DEFAULT));
  }
}