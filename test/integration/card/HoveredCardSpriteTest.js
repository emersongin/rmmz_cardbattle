class HoveredCardSpriteTest extends SceneTest {
  name = 'HoveredCardSpriteTest';

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
    this.test('Deve estar no comportamento de hovered!', () => {
      this.subject.hover();
    }, () => {
      this.assertTrue('Esta em hovered?', this.subject.isHovered());
    });
  } 
}