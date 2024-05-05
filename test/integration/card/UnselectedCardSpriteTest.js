class UnselectedCardSpriteTest extends SceneTest {
  name = 'UnselectedCardSpriteTest';

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
    this.subject.select();
    this.test('Deve retirar o comportamento de seleção!', () => {
      this.subject.unselect();
    }, () => {
      this.assertTrue('Esta sem seleção?', this.subject.isUnselected());
    });
  }
}