class StartOpenCardSpriteTest extends SceneTest {
  name = 'StartOpenCardSpriteTest';

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
  }

  start() {
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.test('Deve iníciar aberto!', () => {
      this.subject.startOpen(centerXPosition, centerYPosition);
      this.subject.show();
    }, () => {
      this.assertWasTrue('Esta aberto?', this.subject.isOpened);
    });
  }
}