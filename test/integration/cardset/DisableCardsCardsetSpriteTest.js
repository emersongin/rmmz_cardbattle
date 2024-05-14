class DisableCardsCardsetSpriteTest extends SceneTest {
  create() {
    const centerXPosition = (Graphics.boxWidth / 2 - CardsetSprite.contentOriginalWidth() / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - CardsetSprite.contentOriginalHeight() / 2);
    this.subject = CardsetSprite.create(centerXPosition, centerYPosition);
    this.addWatched(this.subject);
    this.subject.show();
    const numCards = 10;
    const cards = CardGenerator.generateCards(numCards);
    const disableCardsIndex = [1, 2, 7, 8, 9];
    const sprites = this.subject.listCards(cards);
    const disableSprites = sprites.filter((sprite, index) => disableCardsIndex.includes(index));
    this.subject.disableCards(disableSprites);
    this.subject.showCards(sprites);
  }

  asserts() {
    this.describe('Deve desabilitar as cartas!');
    const numCards = 10;
    const enableCardsIndex = [0, 3, 4, 5, 6];
    const disableCardsIndex = [1, 2, 7, 8, 9];
    const positions = CardsetSprite.createPositionsList(numCards);
    this.assertTrue('Estão desabilitados?', this.subject.isDisabledCardIndexs(disableCardsIndex));
    this.assertTrue('Estão habilitados?', this.subject.isEnabledCardIndexs(enableCardsIndex));
  }
}