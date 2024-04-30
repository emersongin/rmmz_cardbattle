class FlashCardSpriteTest extends SceneTest {
  card;

  create() {
    const card = Generator.generateCard();
    this.card = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    const centerXPosition = (Graphics.boxWidth / 2 - this.card.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.card.height / 2);
    this.card.startOpen(centerXPosition, centerYPosition);
    this.addChild(this.card);
  }

  start() {
    return new Promise(async res => {
      await this.test('O cartão deve receber um flash de luz!', () => {
        const color = 'white';
        const duration = 60;
        const infinity = -1;
        this.card.show();
        this.card.flash(color, duration, infinity);
      }, () => {
        this.assert(this.card.isFlashPlaying()).toBe(true);
      });
      res(true);
    });
  } 
}