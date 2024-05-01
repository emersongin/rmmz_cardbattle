class SelectModeCardsetSpriteTest extends SceneTest {
  cardset;
  name = 'SelectModeCardsetSpriteTest';

  create() {
    this.cardset = CardsetSprite.create();
    const centerXPosition = (Graphics.boxWidth / 2 - this.cardset.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.cardset.height / 2);
    this.cardset.startPosition(centerXPosition, centerYPosition);
    this.cardset.setBackgroundColor('white');
    this.addChild(this.cardset);
  }

  start() {
    return new Promise(async resolve => {
      this.cardset.show();
      const cards = Generator.generateCards(10);
      this.test('Deve entrar em modo seleção!', async () => {
        this.cardset.setCards(cards);
        this.cardset.startListCards();
        this.cardset.showCards();
        this.cardset.selectMode();
      }, () => {
        this.assert('Esta em modo seleção?', this.cardset.isSelectMode()).toBe(true);
      }, 3);
      await this.timertoTrue(5000);
      this.cardset.staticMode();
    });
  }
}