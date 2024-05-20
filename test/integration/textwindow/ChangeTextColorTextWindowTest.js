class ChangeTextColorTextWindowTest extends SceneTest {
  create() {
    const line1 = 'primeiro texto';
    let line2 = 'segundo texto';
    line2 = TextWindow.setTextColor(line2, GameColors.BLUE);
    let line3 = 'terceiro texto';
    line3 = TextWindow.setTextColor(line3, GameColors.DEFAULT);
    const text = [ [line1, line2, line3] ];
    this.subject = TextWindow.createWindowFullSize(0, 0, text);
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    const text = [ 'primeiro texto segundo texto terceiro texto' ];
    this.describe('Deve apresentar o texto que foi informado em janela.');
    this.assertTrue('Foi desenhado o texto 1?', this.subject.isTextWasDrawing('TEXT_0', text[0]));
    const color1 = ColorHelper.getColorIndex(GameColors.BLUE);
    const color2 = ColorHelper.getColorIndex(GameColors.DEFAULT);
    this.assertTrue('Foi alterado a cor do texto?', this.subject.isTextWasDrawing('COLOR_0', color1));
    this.assertTrue('Foi alterado a cor do texto?', this.subject.isTextWasDrawing('COLOR_1', color2));
  }
}