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
      const cards = CardGenerator.generateCards(10);
      const enableCardsIndex = [0, 3, 4, 5, 6];
      this.test('Deve desabilitar todos exceto os indices!', () => {
        this.cardset.setCards(cards);
        this.cardset.startListCards();
        this.cardset.showCards();
        this.cardset.disableCards();
        const sprite = this.cardset.getCardIndex();
        this.cardset.enableCard(sprite);
        const sprites = this.cardset.getCardIndexs([3, 4, 5, 6]);
        this.cardset.enableCards(sprites);
      }, () => {
        this.assertTrue('Esta em modo seleção?', this.cardset.isEnabledCardsIndex(enableCardsIndex));
      });
    });
  }
}