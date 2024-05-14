class SelectModeCardsetSpriteTest extends SceneTest {
  create() {
    const centerXPosition = (Graphics.boxWidth / 2 - CardsetSprite.contentOriginalWidth() / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - CardsetSprite.contentOriginalHeight() / 2);
    this.subject = CardsetSprite.create(centerXPosition, centerYPosition);
    this.addWatched(this.subject);
    this.subject.show();
    const numCards = 10;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    this.subject.showCards(sprites);
    this.subject.selectMode();
  }

  asserts() {
    this.describe('Deve entrar em modo seleção!');
    this.assertTrue('Esta em modo seleção?', this.subject.isSelectMode());
  }
}