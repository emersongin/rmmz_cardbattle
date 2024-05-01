class DisableAndEnableCardsCardsetSpriteTest extends SceneTest {
  cardset;
  name = 'DisableAndEnableCardsCardsetSpriteTest';

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
      const enableCardsIndex = [0, 3, 4, 5, 6];
      this.test('', async () => {
        this.cardset.setCards(cards);
        this.cardset.startListCards();
        this.cardset.showCards();
        this.cardset.disableCards();
        const sprite = this.cardset.getCardIndex();
        this.cardset.enableCard(sprite);
        const sprites = this.cardset.getCardIndexs([3, 4, 5, 6]);
        this.cardset.enableCards(sprites);
        await this.timertoTrue(600);
        this.cardset.staticMode();
      }, () => {
        const isDisableds = enableCardsIndex.every(index => this.cardset.getCardIndex(index).isEnabled());
        this.assert('Esta em modo seleção?', isDisableds).toBe(true);
      });
    });
  }
}