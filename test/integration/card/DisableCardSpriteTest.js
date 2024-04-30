class DisableCardSpriteTest extends SceneTest {
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
      this.card.show();
      await this.test('Deve desabilitar o cartão!', () => {
        this.card.disable();
      }, () => {
        this.assert(this.card.isDisabled()).toBe(true);
      });
      await this.test('Deve habilitar o cartão!', () => {
        this.card.enable();
      }, () => {
        this.assert(this.card.isEnabled()).toBe(true);
      });
      res(true);
    });
  }
}