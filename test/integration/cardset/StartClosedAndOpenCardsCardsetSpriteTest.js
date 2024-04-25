class StartClosedAndOpenCardsCardsetSpriteTest extends SceneTest {
  cardset;
  card;
  scene;

  constructor(scene) {
    super();
    this.scene = scene;
    this.setTest();
  }

  setTest() {
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
      for (let index = 0; index < 6; index++) {
        const cards = this.generateCards(testTimes);
        await this.testCards(cards);
        testTimes++;
      }
      testTimes = 40;
      for (let index = 0; index < 1; index++) {
        const cards = this.generateCards(testTimes);
        await this.testDelayCards(cards);
        testTimes++;
      }
      resolve(true);
    });
  }

  testCards(cards) {
    return new Promise(resolve => {
      this.cardset.setCards(cards);
      this.cardset.startListCards();
      this.cardset.startClosedCards();
      this.cardset.showCards();
      this.cardset.openCards();
      setTimeout(() => {
        this.cardset.clear();
        resolve(true);
      }, 300);
    });
  }

  testDelayCards(cards) {
    return new Promise(resolve => {
      this.cardset.setCards(cards);
      this.cardset.startListCards();
      this.cardset.startClosedCards();
      this.cardset.showCards();
      this.cardset.openCardsWithDelay();
      setTimeout(() => {
        this.cardset.clear();
        resolve(true);
      }, 30 * cards.length);
    });
  }
}