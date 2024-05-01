class DisableCardSpriteTest extends SceneTest {
  card;
  name = 'DisableCardSpriteTest';

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
    this.test('Deve desabilitar o cartão!', () => {
      this.card.disable();
    }, () => {
      this.assertTrue('Esta disabilitado?', this.card.isDisabled());
    });
    this.test('Deve habilitar o cartão!', () => {
      this.card.enable();
    }, () => {
      this.assertTrue('Esta habilitado?', this.card.isEnabled());
    });
  }
}