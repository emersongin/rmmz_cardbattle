class StartClosedCardsCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    const numCards = 1;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.setCards(cards);
    this.subject.startClosedCards(sprites);
    this.subject.show();
    this.sprites = sprites;
  }

  asserts() {
    this.describe('Deve iniciar as cartas fechadas!');
    this.assertTrue('Estão nas posições?', this.subject.allCardsIsClosed(this.sprites));
  }
}