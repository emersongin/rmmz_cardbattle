class FlashCardSpriteTest extends SceneTest {
  name = 'FlashCardSpriteTest';

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
    this.addWatched(this.subject);
  }

  start() {
    const color = 'white';
    const duration = 60;
    const infinity = -1;
    this.test('Deve receber um flash de luz!', () => {
      this.subject.flash(color, duration, infinity);
    }, () => {
      this.assertWasTrue('Houve flash de luz?', this.subject.isFlashPlaying);
    });
  } 
}