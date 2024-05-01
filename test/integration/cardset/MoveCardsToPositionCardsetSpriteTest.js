class MoveCardsToPositionCardsetSpriteTest extends SceneTest {
  cardset;
  name = 'MoveCardsToPositionCardsetSpriteTest';

  create() {
    this.cardset = CardsetSprite.create();
    const centerXPosition = (Graphics.boxWidth / 2 - this.cardset.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.cardset.height / 2);
    this.cardset.startPosition(centerXPosition, centerYPosition);
    this.cardset.setBackgroundColor('white');
    this.addChild(this.cardset);
  }

  start() {
    const numCards = 40;
    this.cardset.show();
    const cards = CardGenerator.generateCards(numCards);
    const screenWidth = Graphics.boxWidth;
    const cardWidth = 96;
    const xPosition = (this.cardset.width / 2) - (cardWidth / 2);
    const yPosition = 0;
    const paddingLeft = 0;
    const positions = CardsetSprite.createPositions(6, paddingLeft, xPosition, yPosition);
    this.test('Deve mover todos os cartões do set na posição!', () => {
      this.cardset.setCards(cards);
      this.cardset.startPositionCards(screenWidth, 0);
      this.cardset.startOpenCards();
      this.cardset.showCards();
      this.cardset.moveCardsToPosition(xPosition, 0);
    }, () => {
      this.assertTrue('Foram movidos para posição?', this.cardset.isSpritesPositions(positions));
    }, 2);
  }
}