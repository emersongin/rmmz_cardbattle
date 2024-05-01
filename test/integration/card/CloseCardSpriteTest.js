class CloseCardSpriteTest extends SceneTest {
  card;
  name = 'CloseCardSpriteTest';

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
      await this.test('Deve fechar o cartão!', () => {
        this.card.show();
        this.card.close();
      }, () => {
        this.assert('Esta fechado?', this.card.isClosed()).toBe(true);
      })
      return res(this.finish());
    });
  }

  // exemplo de teste de unidade
  // this.update(() => {
  //   this.card.update();
  // });
  // this.assert(this.card._status).toBeInstanceof(CardSpriteStoppedState);
  // this.assert(this.card.width).toBe(0);
}