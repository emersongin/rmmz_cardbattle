class FlipCardSpriteTest extends SceneTest {
  name = 'FlipCardSpriteTest';

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
    this.subject.setToDown();
    this.addChild(this.subject);
  }

  start() {
    this.subject.show();
    this.test('Deve estar em estado virado para cima!', () => {
      this.subject.flipToUp();
    }, () => {
      this.assertTrue('Esta virado para cima?', this.subject.isTurnedToUp());
      this.assertTrue('Esta aberto?', this.subject.isOpened());
    });
    this.test('Deve estar em estado virado para baixo!', () => {
      this.subject.flipToDown();
    }, () => {
      this.assertTrue('Esta virado para baixo?', this.subject.isTurnedToDown());
      this.assertTrue('Esta aberto?', this.subject.isOpened());
    });
  }
}