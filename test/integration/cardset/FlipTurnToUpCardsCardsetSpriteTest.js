class FlipTurnToUpCardsCardsetSpriteTest extends SceneTest {
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
    this.subject.flipTurnToUpCards(sprites);
  }

  asserts() {
    this.describe('Deve virar o card para cima!');
    this.expectTrue('Estão virados para cima?', this.subject.allCardsAreTurnToUp());
    this.expectTrue('EStão abertos?', this.subject.allCardsAreOpened());
  }
}