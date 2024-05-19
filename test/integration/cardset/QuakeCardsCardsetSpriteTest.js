class QuakeCardsCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    this.subject.show();
    this.subject.showCards(sprites);
    this.subject.quakeCardsAnimate(sprites);
  }

  asserts() {
    this.describe('Deve tremer as cartas!');
    this.assertWasTrue('Houve um chacoalhar?', this.subject.someSpriteIsMoving);
  }
}