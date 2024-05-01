class QuakeCardSpriteTest extends SceneTest {
  card;
  name = 'QuakeCardSpriteTest';

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
      await this.test('Deve aplicar um zoom no cartão!', () => {
        this.card.show();
        const infinity = 10;
        this.card.quake(infinity);
      }, () => {
        this.assert('Esta chacoalhando?', this.card.isMoving()).toBe(true);
      });
      return res(this.finish());
    });
  }
}