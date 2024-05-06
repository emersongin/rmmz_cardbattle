class IluminatedCardSpriteTest extends SceneTest {
  name = 'IluminatedCardSpriteTest';

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
    this.test('Deve estar no comportamento de iluminado!', () => {
      this.subject.iluminate();
    }, () => {
      this.assertTrue('Esta em iluminado?', this.subject.isIluminated());
    });
  }
}