class MoveCardsToListDelayCardsetSpriteTest extends SceneTest {
  name = 'MoveCardsToListDelayCardsetSpriteTest';

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
    let times = 40;
    for (let i = 0; i < 1; i++) {
      const cards = CardGenerator.generateCards(times);
      const screenWidth = Graphics.boxWidth;
      const positions = CardsetSprite.createPositions(6);
      this.test('Deve mover todos os cartões do set na posição em lista com delay!', () => {
        this.subject.setCards(cards);
        this.subject.startOpenCards();
        this.subject.startListCards();
        this.subject.startPositionCards(screenWidth, 0);
        this.subject.showCards();
        const delay = 10;
        this.subject.moveCardsToListDelay(delay);
      }, () => {
        this.assertTrue('Foram movidos em lista?', this.subject.isSpritesPositions(positions));
      }, 8);
      times++;
    }
  }
}