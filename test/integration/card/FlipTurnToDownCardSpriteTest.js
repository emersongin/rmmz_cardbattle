class FlipTurnToDownCardSpriteTest extends SceneTest {
  name = 'FlipTurnToDownCardSpriteTest';

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
    this.subject.setTurnToUp();
    this.subject.show();
    this.addChild(this.subject);
  }

  start() {
    this.test('Deve virar para baixo!', () => {
      this.subject.flipTurnToDown();
    }, () => {
      this.assertTrue('Esta virado para baixo?', this.subject.isTurnedToDown());
      this.assertTrue('Esta aberto?', this.subject.isOpened());
    });
  }
}