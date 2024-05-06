class OpenCardSpriteTest extends SceneTest {
  name = 'OpenCardSpriteTest';
  // pressToAssert = true;

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
    this.subject.startClosed(centerXPosition, centerYPosition);
    this.addWatched(this.subject);
  }

  start() {
    this.test('Deve abrir!', () => {
      this.subject.open();
    }, () => {
      this.assertTrue('Esta aberta?', this.subject.isOpened());
    });
  }
}