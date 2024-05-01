class DisableAndEnableCardSpriteTest extends SceneTest {
  name = 'DisableAndEnableCardSpriteTest';

  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.addChild(this.subject);
  }

  start() {
    this.subject.show();
    this.test('Deve desabilitar!', () => {
      this.subject.disable();
    }, () => {
      this.assertTrue('Esta disabilitado?', this.subject.isDisabled());
    });
    this.test('Deve habilitar!', () => {
      this.subject.enable();
    }, () => {
      this.assertTrue('Esta habilitado?', this.subject.isEnabled());
    });
  }
}