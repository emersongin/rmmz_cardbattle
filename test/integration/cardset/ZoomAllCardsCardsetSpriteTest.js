class ZoomAllCardsCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    this.subject.showCards(sprites);
    this.subject.zoomAllCards(sprites);
  }

  asserts() {
    this.describe('Deve colocar os cards em zoom!');
    this.expectTrue('Estão com zoom?', this.subject.isCardsZoom());
  }
}