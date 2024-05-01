class LeaveCardSpriteTest extends SceneTest {
  name = 'LeaveCardSpriteTest';

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
    this.test('Deve aplicar um zoom até sumir!', () => {
      this.subject.leave();
    }, () => {
      this.assert('Largura é zero?', this.subject.width).toBe(0);
      this.assert('Altura é zero?', this.subject.height).toBe(0);
    })
  }
}