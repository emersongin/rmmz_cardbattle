class StartClosedCardSpriteTest extends SceneTest {
  card;
  name = 'StartClosedCardSpriteTest';

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
    return new Promise(async res => {
      await this.test('Deve apresentar o cartão fechado!', () => {
        const centerXPosition = (Graphics.boxWidth / 2 - this.card.width / 2);
        const centerYPosition = (Graphics.boxHeight / 2 - this.card.height / 2);
        this.card.startClosed(centerXPosition, centerYPosition);
        this.card.show();
      }, () => {
        this.assert('Esta fechado?', this.card.isClosed()).toBe(true);
      })
      return res(this.finish());
    });
  }
}