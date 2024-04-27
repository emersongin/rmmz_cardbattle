class MoveCardsToListCardsetSpriteTest extends SceneTest {
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
      for (let index = 0; index < 6; index++) {
        const cards = this.generateCards(testTimes);
        await this.testCards(cards);
        testTimes++;
      }
      testTimes = 38;
      for (let index = 0; index < 1; index++) {
        const cards = this.generateCards(testTimes);
        await this.testCardsDelay(cards);
        testTimes++;
      }
      resolve(true);
    });
  }

  testCards(cards) {
    return new Promise(resolve => {
      const screenWidth = Graphics.boxWidth;
      this.cardset.setCards(cards);
      this.cardset.startPositionCards(screenWidth, 0);
      this.cardset.startOpenCards();
      this.cardset.showCards();
      this.cardset.moveCardsToList();
      setTimeout(() => {
        this.cardset.clear();
        resolve(true);
      }, 600);
    });
  }

  testCardsDelay(cards) {
    return new Promise(resolve => {
      const screenWidth = Graphics.boxWidth;
      this.cardset.setCards(cards);
      this.cardset.startPositionCards(screenWidth, 0);
      this.cardset.startOpenCards();
      this.cardset.showCards();
      this.cardset.moveCardsToListDelay(10);
      setTimeout(() => {
        this.cardset.clear();
        resolve(true);
      }, 200 * cards.length);
    });
  }
}