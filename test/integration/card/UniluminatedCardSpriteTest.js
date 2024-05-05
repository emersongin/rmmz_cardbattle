class UniluminatedCardSpriteTest extends SceneTest {
  name = 'UniluminatedCardSpriteTest';

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
    this.addChild(this.subject);
  }

  start() {
    this.subject.iluminate();
    this.test('Deve retirar o comportamento de iluminado!', () => {
      this.subject.uniluminate();
    }, () => {
      this.assertTrue('Esta sem iluminado?', this.subject.isUniluminated());
    });
  }
}