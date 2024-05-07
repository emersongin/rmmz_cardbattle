class MoveCardsToPositionCardsetSpriteTest extends SceneTest {
  name = 'MoveCardsToPositionCardsetSpriteTest';

  create() {
    this.subject = CardsetSprite.create();
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startPosition(centerXPosition, centerYPosition);
    this.subject.setBackgroundColor('white');
    this.addWatched(this.subject);
  }

  start() {
    const numCards = 40;
    this.subject.show();
    const cards = CardGenerator.generateCards(numCards);
    const screenWidth = Graphics.boxWidth;
    const cardWidth = 96;
    const xPosition = (this.subject.width / 2) - (cardWidth / 2);
    const yPosition = 0;
    const paddingLeft = 0;
    const positions = CardsetSprite.createPositions(6, paddingLeft, xPosition, yPosition);
    this.test('Deve mover todos os cartões do set na posição!', () => {
      this.subject.setCards(cards);
      this.subject.startPositionCards(screenWidth, 0);
      this.subject.startOpenCards();
      this.subject.showCards();
      this.subject.moveCardsToPosition(xPosition, 0);
    }, () => {
      this.assertTrue('Foram movidos para posição?', this.subject.isSpritesPositions(positions));
    });
  }
}