class AnimationCardsCardsetSpriteTest extends SceneTest {
  name = 'AnimationCardsCardsetSpriteTest';

  create() {
    const centerXPosition = (Graphics.boxWidth / 2 - CardsetSprite.contentOriginalWidth() / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - CardsetSprite.contentOriginalHeight() / 2);
    this.subject = CardsetSprite.create(centerXPosition, centerYPosition);
    this.subject.show();
    this.addWatched(this.subject);
  }

  start() {
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    this.test('Deve animar os cartões com frame de animação!', () => {
      this.subject.showCards(sprites);
      const times = 1;
      this.subject.damageCardsAnimate(times, sprites, this.scene);
    }, () => {
      this.assertWasTrue('Houve um frame de aimação?', this.subject.someSpriteIsAnimationPlaying);
    });
  }
}