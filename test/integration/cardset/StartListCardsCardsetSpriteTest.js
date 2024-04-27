class StartListCardsCardsetSpriteTest extends SceneTest {
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
      let testTimes = 40;
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
      this.cardset.setCards(cards);
      this.cardset.startListCards();
      this.cardset.showCards();
      setTimeout(() => {
        resolve(true);
        this.cardset.clear();
      }, 300);
    });
  }
}