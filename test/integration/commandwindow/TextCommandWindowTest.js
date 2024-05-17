class TextCommandWindowTest extends SceneTest {
  create() {
    this.pressToAsserts();
    let line1 = 'primeiro texto';
    line1 = CommandWindow.setTextColor(line1, GameColors.RED);
    let line2 = 'segundo texto';
    line2 = CommandWindow.setTextColor(line2, GameColors.BLUE);
    const text = [line1, line2];
    this.subject = CommandWindow.create(0, 0, text);
    this.addWatched(this.subject);
    this.subject.alignTextCenter();
    this.subject.open();
  }

  asserts() {
    const text = [
      'primeiro texto',
      'segundo texto',
    ];
    this.describe('Deve apresentar o texto que foi informado em janela.');
    this.assertTrue('Foi desenhado o texto 1?', this.subject.isTextWasDrawing('TEXT_0', text[0]));
    this.assertTrue('Foi desenhado o texto 2?', this.subject.isTextWasDrawing('TEXT_1', text[1]));
  }
}