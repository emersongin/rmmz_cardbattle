class AnimationCardSpriteTest extends SceneTest {
  name = 'AnimationCardSpriteTest';

  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.addChild(this.subject);
  }

  start() {
    const times = 1;
    this.subject.show();
    this.test('Deve receber uma animação!', () => {
      this.subject.damage(times);
    }, () => {
      this.assertWasTrue('Houve animação?', this.subject.isAnimationPlaying);
    });
  }
}