class MoveCardsToListDelayCardsetSpriteTest extends SceneTest {
  cardset;
  name = 'MoveCardsToListDelayCardsetSpriteTest';

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
    let times = 40;
    for (let i = 0; i < 1; i++) {
      const cards = CardGenerator.generateCards(times);
      const screenWidth = Graphics.boxWidth;
      const positions = CardsetSprite.createPositions(6);
      const timeout = times * 0.2;
      this.test('Deve mover todos os cartões do set na posição em lista com delay!', () => {
        this.cardset.setCards(cards);
        this.cardset.startOpenCards();
        this.cardset.startListCards();
        this.cardset.startPositionCards(screenWidth, 0);
        this.cardset.showCards();
        const delay = 10;
        this.cardset.moveCardsToListDelay(delay);
      }, () => {
        this.assertTrue('Foram movidos em lista?', this.cardset.isSpritesPositions(positions));
      }, timeout);
      times++;
    }
  }
}