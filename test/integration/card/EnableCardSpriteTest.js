class EnableCardSpriteTest extends SceneTest {
  name = 'EnableCardSpriteTest';

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
    this.subject.disable();
    this.test('Deve habilitar!', () => {
      this.subject.enable();
    }, () => {
      this.assertTrue('Esta habilitado?', this.subject.isEnabled());
    });
  }
}