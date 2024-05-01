class SelectModeCardsetSpriteTest extends SceneTest {
  cardset;
  name = 'SelectModeCardsetSpriteTest';

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
      this.cardset.show();
      const cards = this.generateCards(10);
      this.cardset.setCards(cards);
      this.cardset.startListCards();
      this.cardset.showCards();
      this.cardset.selectMode();
      setTimeout(() => {
        this.cardset.staticMode();
        resolve(true);
      }, 3000);
    });
  }
}