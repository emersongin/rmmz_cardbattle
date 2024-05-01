class StartPositionCardsCardsetSpriteTest extends SceneTest {
  cardset;
  name = 'StartPositionCardsCardsetSpriteTest';

  create() {
    this.cardset = CardsetSprite.create();
    const centerXPosition = (Graphics.boxWidth / 2 - this.cardset.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.cardset.height / 2);
    this.cardset.startPosition(centerXPosition, centerYPosition);
    this.cardset.setBackgroundColor('white');
    this.addChild(this.cardset);
  }

  start() {
    this.cardset.show();
    let numCards = 1;
    const x = 100;
    const y = 0;
    const paddingLeft = 0;
    const cards = CardGenerator.generateCards(numCards);
    const positions = CardsetSprite.createPositions(numCards, paddingLeft, x, y);
    this.test('Deve mostrar todos os cartões do set na posição definida!', () => {
      this.cardset.setCards(cards);
      this.cardset.startPositionCards(x, y);
      this.cardset.showCards();
    }, () => {
      this.assertTrue('Estão aberto?', this.cardset.allCardsOpened());
      this.assertTrue('Estão na posição?', this.cardset.isSpritesPositions(positions));
    });
  }
}