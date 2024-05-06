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
    this.subject.show();
    this.addChild(this.subject);
  }

  start() {
    this.test('Deve sumir!', () => {
      this.subject.leave();
    }, () => {
      this.assert('Esta em largura zerada?', this.subject.width).toBe(0);
      this.assert('Esta em altura zerada?', this.subject.height).toBe(0);
      this.assertTrue('Esta invisível?', this.subject.isHidden());
    })
  }
}