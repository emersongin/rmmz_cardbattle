class StartClosedCardSpriteTest extends SceneTest {
  name = 'StartClosedCardSpriteTest';

  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    this.addChild(this.subject);
  }

  start() {
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.test('Deve iníciar fechado!', () => {
      this.subject.startClosed(centerXPosition, centerYPosition);
      this.subject.show();
    }, () => {
      this.assertTrue('Esta fechado?', this.subject.isClosed());
    });
  }
}