class DisableAndEnableCardsCardsetSpriteTest extends SceneTest {
  cardset;
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
    this.cardset.show();
    this.scene.addChild(this.cardset);
  }

  start() {
    return new Promise(async resolve => {
      const cards = this.generateCards(10);
      this.cardset.setCards(cards);
      this.cardset.startListCards();
      this.cardset.showCards();
      this.cardset.disableCards();
      const sprite = this.cardset.getCardIndex();
      this.cardset.enableCard(sprite);
      const sprites = this.cardset.getCardIndexs([3, 4, 5, 6]);
      this.cardset.enableCards(sprites);
      setTimeout(() => {
        this.cardset.staticMode();
        resolve(true);
      }, 600);
    });
  }
}