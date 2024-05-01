class MoveCardSpriteTest extends SceneTest {
  card;
  name = 'MoveCardSpriteTest';

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
    this.card.show();
    const destinyXPosition = (Graphics.boxWidth / 2 - this.card.width / 2);
    const destinyYPosition = (Graphics.boxHeight / 2 - this.card.height / 2);
    const avanceXposition = (Graphics.boxWidth - this.card.width);
    const avanceYposition = (Graphics.boxHeight - this.card.height);
    const returnStartPosition = 0;
    const move1 = CardSprite.createMove(destinyXPosition, destinyYPosition);
    const move2 = CardSprite.createMove(avanceXposition, destinyYPosition);
    const move3 = CardSprite.createMove(avanceXposition, avanceYposition);
    const move4 = CardSprite.createMove(destinyXPosition, avanceYposition);
    const move5 = CardSprite.createMove(returnStartPosition, returnStartPosition);
    const move6 = CardSprite.createMove(destinyXPosition, destinyYPosition);
    const moves = [move1, move2, move3, move4, move5, move6];
    this.test('Deve mover o cartão!', () => {
      this.card.toMove(moves);
    }, () => {
      this.assert('Esta na Posição x?', this.card.x).toBe(destinyXPosition);
      this.assert('Esta na Posição x?', this.card.y).toBe(destinyYPosition);
    }, moves.length * 0.3);
  }
}