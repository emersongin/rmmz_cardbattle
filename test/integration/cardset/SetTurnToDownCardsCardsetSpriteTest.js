class SetTurnToDownCardsCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    this.subject.setTurnToDownCards(sprites);
    this.subject.showCards(sprites);
    this.sprites = sprites;
  }

  asserts() {
    this.describe('Deve listar as cartas viradas para baixo!');
    this.expectTrue('Esta viradas para baixo?', this.subject.allCardsTurnedToDown());
  }
}