class LeaveAllCardsCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    this.subject.showCards(sprites);
    this.subject.leaveAllCards(sprites);
  }

  asserts() {
    this.describe('Deve retirar os sprites da tela!');
    this.expectTrue('Estão ocultos?', this.subject.isCardsHidden());
  }
}