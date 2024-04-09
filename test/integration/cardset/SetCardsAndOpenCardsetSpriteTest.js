class SetCardsAndOpenCardsetSpriteTest extends Test {
  cardset;
  card;
  scene;

  constructor(scene) {
    super();
    this.scene = scene;
    this.setTest();
  }

  setTest() {
    this.card = {
      type: CardTypes.BATTLE,
      color: CardColors.BLUE,
      figureName: 'default',
      attack: 11,
      health: 12
    };
    this.cardset = CardsetSprite.create();
    const centerXPosition = (Graphics.boxWidth / 2 - this.cardset.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.cardset.height / 2);
    this.cardset.startPosition(centerXPosition, centerYPosition);
    this.cardset.setBackGroundColor('white');
    this.scene.addChild(this.cardset);
  }

  async start() {
    let times = 1;
    for (let index = 0; index < 6; index++) {
      const cards = [];
      for (let i = 0; i < times; i++) {
        cards.push(this.card);
      }
      await this.testCardsNoTime(cards);
      times++;
    }
  }

  testCardsNoTime(cards) {
    return new Promise(resolve => {
      this.cardset.setCardsAndOpen(cards);
      setTimeout(() => {
        resolve(true);
      }, 300);
    });
  }

  testCardsTimeToOpen(cards) {
    return new Promise(resolve => {
      const times = 300;
      this.cardset.setCardsAndOpen(cards, times);
      setTimeout(() => {
        resolve(true);
      }, cards.length * times);
    });
  }

}