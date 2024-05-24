class CloseAllCardsCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    this.subject.showCards(sprites);
    this.subject.closeAllCards(sprites);
    this.sprites = sprites;
  }

  asserts() {
    this.describe('Deve fechar todas as cartas!');
    this.expectTrue('Estão fechados?', this.subject.allCardsIsClosed(this.sprites));
  }
}