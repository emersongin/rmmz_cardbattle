class AddCardAndMoveToListCardsetSpriteTest extends SceneTest {
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
    return new Promise(resolve => {
      const cards = this.generateCards(3);
      this.cardset.setCards(cards);
      this.cardset.startListCards();
      this.cardset.showCards();
      setTimeout(async () => {
        resolve(await this.testCard());
      }, 300);
    });
  }

  testCard() {
    return new Promise(resolve => {
      const card = this.generateCard();
      const sprite = this.cardset.addCard(card);
      const screenWidth = Graphics.boxWidth;
      this.cardset.startPositionCard(sprite, screenWidth, 0);
      this.cardset.showCard(sprite);
      this.cardset.moveCardToList(sprite);
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  }
}