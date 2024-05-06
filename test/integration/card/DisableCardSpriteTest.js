class DisableCardSpriteTest extends SceneTest {
  name = 'DisableCardSpriteTest';

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
    this.subject.show();
    this.addWatched(this.subject);
  }

  start() {
    this.subject.enable();
    this.test('Deve desabilitar!', () => {
      this.subject.disable();
    }, () => {
      this.assertTrue('Esta disabilitado?', this.subject.isDisabled());
    });
  }
}