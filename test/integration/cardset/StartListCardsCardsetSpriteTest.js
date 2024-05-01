class StartListCardsCardsetSpriteTest extends SceneTest {
  cardset;
  name = 'StartListCardsCardsetSpriteTest';

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
    const cards = Generator.generateCards(numCards);
    const positions = CardsetSprite.createPositions(numCards);
    this.test('Deve mostrar todos os cartões em lista!', () => {
      this.cardset.setCards(cards);
      this.cardset.startListCards();
      this.cardset.showCards();
    }, () => {
      this.assertTrue('Estão em lista?', this.cardset.isSpritesPositions(positions));
    });
  }
}


