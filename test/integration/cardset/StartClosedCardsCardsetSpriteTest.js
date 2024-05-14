class StartClosedCardsCardsetSpriteTest extends SceneTest {
  create() {
    const centerXPosition = (Graphics.boxWidth / 2 - CardsetSprite.contentOriginalWidth() / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - CardsetSprite.contentOriginalHeight() / 2);
    this.subject = CardsetSprite.create(centerXPosition, centerYPosition);
    this.addWatched(this.subject);
    this.subject.show();
    const numCards = 1;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.setCards(cards);
    this.subject.startClosedCards(sprites);
    this.sprites = sprites;
  }

  asserts() {
    this.describe('Deve iniciar as cartas fechadas!');
    this.assertTrue('Estão nas posições?', this.subject.allCardsIsClosed(this.sprites));
  }
}