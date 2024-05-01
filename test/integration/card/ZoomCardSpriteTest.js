class ZoomInCardSpriteTest extends SceneTest {
  card;
  name = 'ZoomInCardSpriteTest';

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
    this.test('Deve aplicar um zoom no cartão!', () => {
      this.card.show();
      this.card.zoom();
    }, () => {
      this.assert('Esta ampliado?', this.card.isZoom()).toBe(true);
    });
  }
}