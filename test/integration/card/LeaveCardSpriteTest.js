class LeaveCardSpriteTest extends SceneTest {
  card;
  name = 'LeaveCardSpriteTest';

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
    this.test('Deve aplicar um zoom no cartão!', () => {
      this.card.leave();
    }, () => {
      this.assert('Largura é zero?', this.card.width).toBe(0);
      this.assert('Altura é zero?', this.card.height).toBe(0);
    })
  }
}