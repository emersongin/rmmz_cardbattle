class StartOpenCardSpriteTest extends SceneTest {
  card;
  name = 'StartOpenCardSpriteTest';

  create() {
    const card = Generator.generateCard();
    this.card = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    this.addChild(this.card);
  }

  start() {
    this.test('Deve apresentar o cartão aberto!', () => {
      const centerXPosition = (Graphics.boxWidth / 2 - this.card.width / 2);
      const centerYPosition = (Graphics.boxHeight / 2 - this.card.height / 2);
      this.card.startOpen(centerXPosition, centerYPosition);
      this.card.show();
    }, () => {
      this.assert('Esta aberto?', this.card.isOpened()).toBe(true);
    });
  }
}