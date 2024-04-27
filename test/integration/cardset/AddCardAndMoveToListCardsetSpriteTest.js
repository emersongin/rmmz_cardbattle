class AddCardAndMoveToListCardsetSpriteTest extends SceneTest {
  cardset;

  create() {
    this.cardset = CardsetSprite.create();
    const centerXPosition = (Graphics.boxWidth / 2 - this.cardset.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.cardset.height / 2);
    this.cardset.startPosition(centerXPosition, centerYPosition);
    this.cardset.setBackgroundColor('white');
  }

  start() {
    return new Promise(async resolve => {
      this.scene.addChild(this.cardset);
      let testTimes = 1;
      for (let index = 0; index < 3; index++) {
        const cards = this.generateCards(3);
        const sprites = this.cardset.setCards(cards);
        this.cardset.startListCards(sprites);
        this.cardset.showCards(sprites);
        const newCards = this.generateCards(testTimes);
        const newSprites = this.cardset.addCards(newCards);
        await this.testCard(newSprites);
        testTimes++;
      }
      testTimes = 1;
      for (let index = 0; index < 3; index++) {
        const cards = this.generateCards(3);
        const sprites = this.cardset.setCards(cards);
        this.cardset.startListCards(sprites);
        this.cardset.showCards(sprites);
        const newCards = this.generateCards(testTimes);
        const newSprites = this.cardset.addCards(newCards);
        await this.testCards(newSprites);
        testTimes++;
      }
      resolve(true);
    });
  }

  testCard(sprites) {
    return new Promise(resolve => {
      const screenWidth = Graphics.boxWidth;
      this.cardset.startPositionCards(screenWidth, 0, sprites);
      this.cardset.showCards(sprites);
      this.cardset.moveCardsToList(sprites);
      setTimeout(async () => {
        this.cardset.clear();
        resolve(true);
      }, 500 * sprites.length);
    });
  }

  testCards(sprites) {
    return new Promise(resolve => {
      const screenWidth = Graphics.boxWidth;
      this.cardset.startPositionCards(screenWidth, 0, sprites);
      this.cardset.showCards(sprites);
      const delay = 10;
      this.cardset.moveCardsToListDelay(delay, sprites);
      setTimeout(async () => {
        this.cardset.clear();
        resolve(true);
      }, 500 * sprites.length);
    });
  }
}