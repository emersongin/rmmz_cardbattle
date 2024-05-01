class StartListCardsCardsetSpriteTest extends SceneTest {
  name = 'StartListCardsCardsetSpriteTest';

  create() {
    this.subject = CardsetSprite.create();
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startPosition(centerXPosition, centerYPosition);
    this.subject.setBackgroundColor('white');
    this.addChild(this.subject);
  }

  start() {
    const numCards = 40;
    this.subject.show();
    const cards = CardGenerator.generateCards(numCards);
    const positions = CardsetSprite.createPositions(numCards);
    this.test('Deve mostrar todos os cartões em lista!', () => {
      this.subject.setCards(cards);
      this.subject.startListCards();
      this.subject.showCards();
    }, () => {
      this.assertTrue('Estão em lista?', this.subject.isSpritesPositions(positions));
    });
  }
}


