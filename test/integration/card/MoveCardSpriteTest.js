class MoveCardSpriteTest extends SceneTest {
  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    this.addWatched(this.subject);
    this.subject.startOpen(0, 0);
    this.subject.show();
    const destinyXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const destinyYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    const avanceXposition = (Graphics.boxWidth - this.subject.width);
    const avanceYposition = (Graphics.boxHeight - this.subject.height);
    const returnStartPosition = 0;
    const move1 = CardSprite.createMove(destinyXPosition, destinyYPosition);
    const move2 = CardSprite.createMove(avanceXposition, destinyYPosition);
    const moves = [move1, move2];
    this.subject.toMove(moves);
  }

  asserts() {
    const destinyYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    const avanceXposition = (Graphics.boxWidth - this.subject.width);
    this.describe('Deve mover cartão pela tela.');
    this.assert('Esta no destino x?', this.subject.x).toBe(avanceXposition);
    this.assert('Esta no destino y', this.subject.y).toBe(destinyYPosition);
    this.assertWasTrue('Estava em movimento?', this.subject.isMoving);
  }
}