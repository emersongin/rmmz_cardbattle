class MoveCardsToListCardsetSpriteTest extends SceneTest {
  cardset;
  name = 'MoveCardsToListCardsetSpriteTest';

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
    let times = 1;
    for (let i = 0; i < 6; i++) {
      const cards = CardGenerator.generateCards(times);
      const screenWidth = Graphics.boxWidth;
      const paddingLeft = 97;
      const positions = CardsetSprite.createPositions(6, paddingLeft);
      this.test('Deve mover todos os cartões do set na posição em lista!', () => {
        const sprites = this.cardset.setCards(cards);
        this.cardset.startPositionCards(screenWidth, 0);
        this.cardset.startOpenCards();
        this.cardset.showCards();
        this.cardset.moveCardsToList();
      }, () => {
        this.assertTrue('Foram movidos em lista?', this.cardset.isSpritesPositions(positions));
      });
      times++;
    }
  }
}