class SelectedCardSpriteTest extends SceneTest {
  name = 'SelectedCardSpriteTest';

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
    this.test('Deve estar no comportamento de seleção!', () => {
      this.subject.select();
    }, () => {
      this.assertTrue('Esta em seleção?', this.subject.isSelected());
    });
  }
}