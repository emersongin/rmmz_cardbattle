class SelectModeAndEnableChoiceCardsetSpriteTest extends SceneTest {
  cardset;
  name = 'SelectModeAndEnableChoiceCardsetSpriteTest';

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
      const cards = CardGenerator.generateCards(10);
      this.test('Deve entrar em modo seleção!', () => {
        this.cardset.setCards(cards);
        this.cardset.startListCards();
        this.cardset.showCards();
        const sprites = this.cardset.getCardIndexs([4, 5]);
        this.cardset.disableCards();
        this.cardset.enableCards(sprites);
        this.cardset.selectMode();
        this.cardset.enableChoice();
      }, () => {
        this.assertTrue('Esta em modo seleção?', this.cardset.isSelectMode());
        this.assertTrue('Esta em modo escolha?', this.cardset.isEnableChoice());
      }, 3);
      await this.timertoTrue(5000);
      this.cardset.staticMode();
    });
  }
}