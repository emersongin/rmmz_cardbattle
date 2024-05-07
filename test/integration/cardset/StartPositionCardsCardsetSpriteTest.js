class StartPositionCardsCardsetSpriteTest extends SceneTest {
  name = 'StartPositionCardsCardsetSpriteTest';

  create() {
    this.subject = CardsetSprite.create();
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startPosition(centerXPosition, centerYPosition);
    this.subject.setBackgroundColor('white');
    this.addWatched(this.subject);
  }

  start() {
    this.subject.show();
    let numCards = 1;
    const x = 100;
    const y = 0;
    const paddingLeft = 0;
    const cards = CardGenerator.generateCards(numCards);
    const positions = CardsetSprite.createPositions(numCards, paddingLeft, x, y);
    this.test('Deve mostrar todos os cartões do set em posição!', () => {
      this.subject.setCards(cards);
      this.subject.startPositionCards(x, y);
      this.subject.showCards();
    }, () => {
      this.assertTrue('Estão aberto?', this.subject.allCardsOpened());
      this.assertTrue('Estão na posição?', this.subject.isSpritesPositions(positions));
    });
  }
}