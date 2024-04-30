class MoveCardSpriteTest extends SceneTest {
  card;

  create() {
    const card = Generator.generateCard();
    this.card = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    this.card.startOpen(0, 0);
    this.addChild(this.card);
  }

  start() {
    return new Promise(async res => {
      this.card.show();
      const destinyXPosition = (Graphics.boxWidth / 2 - this.card.width / 2);
      const destinyYPosition = (Graphics.boxHeight / 2 - this.card.height / 2);
      const avanceXposition = (Graphics.boxWidth - this.card.width);
      const avanceYposition = (Graphics.boxHeight - this.card.height);
      const returnStartPosition = 0;
      await this.test('Deve mover o cartão!', () => {
        this.card.toMove(destinyXPosition, destinyYPosition);
      }, () => {
        this.assert(this.card.x).toBe(destinyXPosition);
        this.assert(this.card.y).toBe(destinyYPosition);
      });
      await this.test('Deve mover o cartão!', () => {
        this.card.toMove(avanceXposition, destinyYPosition);
      }, () => {
        this.assert(this.card.x).toBe(avanceXposition);
        this.assert(this.card.y).toBe(destinyYPosition);
      });
      await this.test('Deve mover o cartão!', () => {
        this.card.toMove(avanceXposition, avanceYposition);
        this.card.toMove(destinyXPosition, avanceYposition);
      }, () => {
        this.assert(this.card.x).toBe(destinyXPosition);
        this.assert(this.card.y).toBe(avanceYposition);
      });
      await this.test('Deve mover o cartão!', () => {
        this.card.toMove(returnStartPosition, returnStartPosition);
        this.card.toMove(destinyXPosition, destinyYPosition);
      }, () => {
        this.assert(this.card.x).toBe(destinyXPosition);
        this.assert(this.card.y).toBe(destinyYPosition);
      });
      res(true);
    });
  }
}