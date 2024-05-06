class FlipTurnToUpCardSpriteTest extends SceneTest {
  name = 'FlipTurnToUpCardSpriteTest';

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
    this.subject.setTurnToDown();
    this.subject.show();
    this.addWatched(this.subject);
  }

  start() {
    this.test('Deve virar para cima!', () => {
      this.subject.flipTurnToUp();
    }, () => {
      this.assertTrue('Esta virado para cima?', this.subject.isTurnedToUp());
      this.assertTrue('Esta aberto?', this.subject.isOpened());
    });
  }
}