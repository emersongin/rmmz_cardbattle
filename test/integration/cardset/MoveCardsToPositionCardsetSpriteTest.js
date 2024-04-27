class MoveCardsToPositionCardsetSpriteTest extends SceneTest {
  cardset;

  create() {
    this.cardset = CardsetSprite.create();
    const centerXPosition = (Graphics.boxWidth / 2 - this.cardset.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.cardset.height / 2);
    this.cardset.startPosition(centerXPosition, centerYPosition);
    this.cardset.setBackgroundColor('white');
    this.scene.addChild(this.cardset);
  }

  start() {
    return new Promise(async resolve => {
      let testTimes = 1;
      for (let index = 0; index < 1; index++) {
        const cards = this.generateCards(testTimes);
        await this.testCards(cards);
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
      const cardWidth = 96;
      const xPosition = (this.cardset.width / 2) - (cardWidth / 2);
      this.cardset.moveCardsToPosition(xPosition, 0);
      setTimeout(() => {
        this.cardset.clear();
        resolve(true);
      }, 1000);
    });
  }
}