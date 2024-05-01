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
    this.card.show();
    const infinity = 10;
    this.test('Deve aplicar um zoom no cartão!', () => {
      this.card.quake(infinity);
    }, () => {
      this.assertTrue('Esta chacoalhando?', this.card.isMoving());
    });
  }
}