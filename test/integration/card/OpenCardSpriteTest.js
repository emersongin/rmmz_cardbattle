class OpenCardSpriteTest extends SceneTest {
  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    this.addWatched(this.subject);
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startClosed(centerXPosition, centerYPosition);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve abrir o card!');
    this.expectTrue('Esta aberta?', this.subject.isOpened());
  }
}