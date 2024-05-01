class AddCardAndMoveToListDelayCardsetSpriteTest extends SceneTest {
  cardset;
  name = 'AddCardAndMoveToListDelayCardsetSpriteTest';

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
    for (let i = 0; i < 3; i++) {
      const cards = CardGenerator.generateCards(3);
      const newCards = CardGenerator.generateCards(times);
      const screenWidth = Graphics.boxWidth;
      const positions = CardsetSprite.createPositions(6, 97);
      positions.shift();
      positions.shift();
      positions.shift();
      this.test('Deve mover todos os cartões do set na posição em lista com delay!', () => {
        const sprites = this.cardset.setCards(cards);
        this.cardset.startListCards(sprites);
        this.cardset.showCards(sprites);
        const newSprites = this.cardset.addCards(newCards);
        this.cardset.startPositionCards(screenWidth, 0, newSprites);
        this.cardset.showCards(newSprites);
        const delay = 10;
        this.cardset.moveCardsToListDelay(delay, newSprites);
      }, () => {
        this.assertTrue('Foram movidos em lista?', this.cardset.isSpritesPositions(positions));
      });
      times++;
    }
  }
}