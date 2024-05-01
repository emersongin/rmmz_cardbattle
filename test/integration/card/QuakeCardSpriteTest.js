class QuakeCardSpriteTest extends SceneTest {
  name = 'QuakeCardSpriteTest';

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
    this.subject.show();
    const infinity = 10;
    this.test('Deve aplicar um chacoalhar!', () => {
      this.subject.quake(3);
    }, () => {
      this.assertWasTrue('Esta chacoalhando?', this.subject.isMoving);
    });
  }
}