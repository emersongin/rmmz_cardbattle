class AnimationCardSpriteTest extends SceneTest {
  name = 'AnimationCardSpriteTest';

  create() {
    const baseCenterXPosition = (Graphics.boxWidth / 2 - CardsetSprite.contentOriginalWidth() / 2);
    const baseCenterYPosition = (Graphics.boxHeight / 2 - CardsetSprite.contentOriginalHeight() / 2);
    this.base = CardsetSprite.create(baseCenterXPosition, baseCenterYPosition);
    this.base.setBackgroundColor('black');
    this.base.show();
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    const centerXPosition = (this.base.width / 2 - this.subject.width / 2);
    const centerYPosition = 0;
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.subject.show();

    this.base.addChild(this.subject);
    this.addWatched(this.base);
  }

  start() {
    const times = 1;
    this.test('Deve receber uma animação!', () => {
      this.subject.damage(times, this.scene);
    }, () => {
      this.assertWasTrue('Houve animação?', this.base.someSpriteIsAnimationPlaying);
    });
  }
}