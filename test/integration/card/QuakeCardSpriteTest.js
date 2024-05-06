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
    this.subject.show();
    this.addChild(this.subject);
  }

  start() {
    const times = 10;
    this.test('Deve aplicar um movimento de chacoalhar!', () => {
      this.subject.quake(times);
    }, () => {
      this.assertWasTrue('Houve um movimento?', this.subject.isMoving);
    });
  }
}