class HoveredCardSpriteTest extends SceneTest {
  card;
  name = 'HoveredCardSpriteTest';

  create() {
    const card = Generator.generateCard();
    this.card = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    const centerXPosition = (Graphics.boxWidth / 2 - this.card.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.card.height / 2);
    this.card.startOpen(centerXPosition, centerYPosition);
    this.addChild(this.card);
  }

  start() {
    return new Promise(async res => {
      await this.test('O cartão deve estar em estado de hover!', () => {
        this.card.show();
        this.card.hover();
      }, () => {
        this.assert('Esta em cursor?', this.card.isHovered()).toBe(true);
      });
      return res(this.finish());
    });
  } 
}