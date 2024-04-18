class StartListCardsCardsetSpriteTest extends Test {
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

  async start() {
    let testTimes = 1;
    for (let index = 0; index < 40; index++) {
      const cards = this.generateCards(testTimes);
      await this.testCards(cards);
      testTimes++;
    }
  }

  generateCards(amount = 1) {
    const cards = [];
    for (let i = 0; i < amount; i++) {
      cards.push(this.generateCard());
    }
    return cards;
  }

  generateCard() {
    return {
      type: Math.floor(Math.random() * 3) + 1,
      color: Math.floor(Math.random() * 6) + 1,
      figureName: 'default',
      attack: Math.floor(Math.random() * 99) + 1,
      health: Math.floor(Math.random() * 99) + 1
    };
  }

  testCards(cards) {
    return new Promise(resolve => {
      this.cardset.setCards(cards);
      this.cardset.startListCards();
      this.cardset.showCards();
      setTimeout(() => {
        resolve(true);
      }, 300);
    });
  }
}