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
    this.addChild(this.subject);
  }

  start() {
    this.subject.show();
    this.test('Deve estar em estado iluminado!', () => {
      this.subject.iluminate();
    }, () => {
      this.assertTrue('Esta iluminado?', this.subject.isIluminated());
    });
    this.test('Deve estar em estado normal!', () => {
      this.subject.iluminate();
    }, () => {
      this.assertTrue('Esta normal?', this.subject.isIluminated());
    });
  }
}