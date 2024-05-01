class SelectModeAndEnableChoiceCardsetSpriteTest extends SceneTest {
  cardset;
  name = 'SelectModeAndEnableChoiceCardsetSpriteTest';

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
      const sprites = this.cardset.getCardIndexs([4, 5]);
      this.cardset.disableCards();
      this.cardset.enableCards(sprites);
      this.cardset.selectMode();
      this.cardset.enableChoice();
      setTimeout(() => {
        this.cardset.staticMode();
        resolve(true);
      }, 3000);
    });
  }
}