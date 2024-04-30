class DamageAnimationCardSpriteTest extends SceneTest {
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
      await this.test('O cartão deve receber uma animação de dano!', () => {
        const times = 1;
        this.card.show();
        this.card.damage(times);
      }, () => {
        this.assert(this.card.isAnimationPlaying()).toBe(true);
      });
      res(true);
    });
  }
}