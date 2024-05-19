class DisableCardsCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    const numCards = 10;
    const cards = CardGenerator.generateCards(numCards);
    const disableCardsIndex = [1, 2, 7, 8, 9];
    const sprites = this.subject.listCards(cards);
    const disableSprites = sprites.filter((sprite, index) => disableCardsIndex.includes(index));
    this.subject.show();
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