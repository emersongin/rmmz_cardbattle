class DisableCardsCardsetSpriteTest extends SceneTest {
  name = 'DisableCardsCardsetSpriteTest';

  create() {
    const centerXPosition = (Graphics.boxWidth / 2 - CardsetSprite.contentOriginalWidth() / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - CardsetSprite.contentOriginalHeight() / 2);
    this.subject = CardsetSprite.create(centerXPosition, centerYPosition);
    this.subject.show();
    this.addWatched(this.subject);
  }

  start() {
    const numCards = 10;
    const cards = CardGenerator.generateCards(numCards);
    const enableCardsIndex = [0, 3, 4, 5, 6];
    const disableCardsIndex = [1, 2, 7, 8, 9];
    const sprites = this.subject.listCards(cards);
    const disableSprites = sprites.filter((sprite, index) => disableCardsIndex.includes(index));
    this.test('Deve apresentar cartões desabilitados de acordo com os indices!', () => {
      this.subject.disableCards(disableSprites);
      this.subject.showCards(sprites);
    }, () => {
      const positions = CardsetSprite.createPositionsList(numCards);
      this.assertTrue('Estão desabilitados?', this.subject.isDisabledCardIndexs(disableCardsIndex));
      this.assertTrue('Estão habilitados?', this.subject.isEnabledCardIndexs(enableCardsIndex));
    });
  }
}