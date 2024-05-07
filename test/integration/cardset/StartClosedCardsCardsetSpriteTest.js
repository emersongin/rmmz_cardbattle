class StartClosedCardsCardsetSpriteTest extends SceneTest {
  name = 'StartClosedCardsCardsetSpriteTest';

  create() {
    const centerXPosition = (Graphics.boxWidth / 2 - CardsetSprite.contentOriginalWidth() / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - CardsetSprite.contentOriginalHeight() / 2);
    this.subject = CardsetSprite.create(centerXPosition, centerYPosition);
    this.subject.show();
    this.addWatched(this.subject);
  }

  start() {
    const numCards = 1;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.setCards(cards);
    this.test('Deve mostrar os cartões do set fechado!', () => {
      this.subject.startClosedCards(sprites);
    }, () => {
      this.assertTrue('Estão nas posições?', this.subject.allCardsIsClosed(sprites));
    });
  }
}