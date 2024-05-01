class DisableAndEnableCardsCardsetSpriteTest extends SceneTest {
  name = 'DisableAndEnableCardsCardsetSpriteTest';

  create() {
    this.subject = CardsetSprite.create();
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startPosition(centerXPosition, centerYPosition);
    this.subject.setBackgroundColor('white');
    this.addChild(this.subject);
  }

  start() {
    return new Promise(async resolve => {
      this.subject.show();
      const cards = CardGenerator.generateCards(10);
      const enableCardsIndex = [0, 3, 4, 5, 6];
      const disableCardsIndex = [1, 2, 7, 8, 9];
      this.test('Deve apresentar habilitados e desabilitados por indices!', () => {
        this.subject.setCards(cards);
        this.subject.startListCards();
        this.subject.showCards();
        this.subject.disableCards();
        const sprite = this.subject.getCardIndex();
        this.subject.enableCard(sprite);
        const sprites = this.subject.getCardIndexs([3, 4, 5, 6]);
        this.subject.enableCards(sprites);
      }, () => {
        this.assertTrue('Estão desabilitados?', this.subject.isDisabledCardsIndex(disableCardsIndex));
        this.assertTrue('Estão habilitados?', this.subject.isEnabledCardsIndex(enableCardsIndex));
      });
    });
  }
}