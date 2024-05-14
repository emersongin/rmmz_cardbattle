class OpenCardsCardsetSpriteTest extends SceneTest {
  create() {
    const centerXPosition = (Graphics.boxWidth / 2 - CardsetSprite.contentOriginalWidth() / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - CardsetSprite.contentOriginalHeight() / 2);
    this.subject = CardsetSprite.create(centerXPosition, centerYPosition);
    this.addWatched(this.subject);
    this.subject.show();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    this.subject.startClosedCards(sprites);
    this.subject.showCards(sprites);
    this.subject.openCards(sprites);
    this.sprites = sprites;
  }

  asserts() {
    this.describe('Deve abrir as cartas!');
    this.assertTrue('Estão aberto?', this.subject.allCardsIsOpened(this.sprites));
  }
}