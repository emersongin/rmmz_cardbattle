class MoveCardSpriteTest extends SceneTest {
  name = 'MoveCardSpriteTest';

  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    this.subject.startOpen(0, 0);
    this.addWatched(this.subject);
  }

  start() {
    this.subject.show();
    const destinyXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const destinyYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    const avanceXposition = (Graphics.boxWidth - this.subject.width);
    const avanceYposition = (Graphics.boxHeight - this.subject.height);
    const returnStartPosition = 0;
    const move1 = CardSprite.createMove(destinyXPosition, destinyYPosition);
    const move2 = CardSprite.createMove(avanceXposition, destinyYPosition);
    const move3 = CardSprite.createMove(avanceXposition, avanceYposition);
    const move4 = CardSprite.createMove(destinyXPosition, avanceYposition);
    const move5 = CardSprite.createMove(returnStartPosition, returnStartPosition);
    const move6 = CardSprite.createMove(destinyXPosition, destinyYPosition);
    const moves = [move1, move2, move3, move4, move5, move6];
    this.test('Deve mover!', () => {
      this.subject.toMove(moves);
    }, () => {
      this.assertWasTrue('Estava em movimento?', this.subject.isMoving);
      this.assert('Esta no destino x?', this.subject.x).toBe(destinyXPosition);
      this.assert('Esta no destino y', this.subject.y).toBe(destinyYPosition);
    });
  }
}