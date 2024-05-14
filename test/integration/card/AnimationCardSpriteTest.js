class AnimationCardSpriteTest extends SceneTest {
  create() {
    const baseCenterXPosition = (Graphics.boxWidth / 2 - CardsetSprite.contentOriginalWidth() / 2);
    const baseCenterYPosition = (Graphics.boxHeight / 2 - CardsetSprite.contentOriginalHeight() / 2);
    this.base = CardsetSprite.create(baseCenterXPosition, baseCenterYPosition);
    this.attachChild(this.base);
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
    this.addHiddenWatched(this.subject);
    const centerXPosition = (this.base.width / 2 - this.subject.width / 2);
    const centerYPosition = 0;
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.subject.show();
    this.base.addChild(this.subject);
    const times = 1;
    this.subject.damage(times, this.scene);
  }

  asserts() {
    this.describe('Deve receber uma animação!');
    this.assertWasTrue('Houve animação?', this.subject.isAnimationPlaying);
  }
}