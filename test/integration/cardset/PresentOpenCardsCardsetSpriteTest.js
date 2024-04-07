class PresentOpenCardsCardsetSpriteTest extends Test {
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
    for (let index = 0; index < 40; index++) {
      const cards = [];
      this.cardset.clearContent();
      for (let i = 0; i < times; i++) {
        cards.push(this.card);
      }
      await this.testCards(cards);
      times++;
    }
  }

  testCards(cards) {
    return new Promise(resolve => {
      this.cardset.setCards(cards);
      this.cardset.presentOpenCards();
      setTimeout(() => {
        resolve(true);
      }, 100 * cards.length);
    });
  }

}