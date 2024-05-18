class AnimationCardsCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    this.subject.showCards(sprites);
    const times = 1;
    this.subject.damageCardsAnimate(times, sprites, this.scene);
  }

  asserts() {
    this.describe('Deve animar as cartas!');
    this.assertWasTrue('Houve um frame de aimação?', this.subject.someSpriteIsAnimationPlaying);
  }
}