class FlashCardSpriteTest extends SceneTest {
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
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.subject.show();
    const color = 'white';
    const duration = GameConst.FPS;
    const infinity = -1;
    this.subject.flash(color, duration, infinity);
  }

  asserts() {
    this.describe('Deve receber um flash de luz!');
    this.assertWasTrue('Houve flash de luz?', this.subject.isFlashPlaying);
  } 
}