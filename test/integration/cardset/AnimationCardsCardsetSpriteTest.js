class AnimationCardsCardsetSpriteTest extends SceneTest {
  create() {
    const centerXPosition = (Graphics.boxWidth / 2 - CardsetSprite.contentOriginalWidth() / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - CardsetSprite.contentOriginalHeight() / 2);
    this.subject = CardsetSprite.create(centerXPosition, centerYPosition);
    this.attachChild(this.subject);
    this.subject.show();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    this.sprite = sprites[0];
    this.addHiddenWatched(this.sprite);
    this.subject.showCards(sprites);
    const times = 1;
    this.subject.damageCardsAnimate(times, sprites, this.scene);
  }

  asserts() {
    this.describe('Deve animar as cartas!');
    this.assertWasTrue('Houve um frame de aimação?', this.sprite.isAnimationPlaying);
  }
}