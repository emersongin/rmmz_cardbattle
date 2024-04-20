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
      const sprites = this.cardset.setCards(cards);
      this.cardset.startListCards(sprites);
      this.cardset.showCards(sprites);

      const newCards = this.generateCards(3);
      const newSprites = this.cardset.addCards(newCards);
      const screenWidth = Graphics.boxWidth;
      newSprites.forEach(sprite => {
        this.cardset.startPositionCard(sprite, screenWidth, 0);
        this.cardset.showCard(sprite);
        this.cardset.moveCardToList(sprite, newSprites);
      });
      // this.cardset.moveCardsToList(newSprites);
      setTimeout(async () => {
        resolve(true);
      }, 2300);
    });
  }
}