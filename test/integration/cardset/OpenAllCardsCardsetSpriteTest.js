class OpenAllCardsCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    this.subject.startClosedCards(sprites);
    this.subject.showCards(sprites);
    this.subject.openAllCards(sprites);
    this.sprites = sprites;
  }

  asserts() {
    this.describe('Deve abrir todas as cartas!');
    this.expectTrue('Estão aberto?', this.subject.allCardsAreOpen(this.sprites));
  }
}