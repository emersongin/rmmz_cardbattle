class FlashCardsCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    this.subject.showCards(sprites);
    this.subject.flashCardsAnimate(sprites, 'orange');
  }

  asserts() {
    this.describe('Deve animar as cartas!');
    this.expectWasTrue('Houve um flash de luz?', this.subject.someSpriteIsFlashPlaying);
  }
}