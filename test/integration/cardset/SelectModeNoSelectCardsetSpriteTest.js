class SelectModeNoSelectCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 10;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    const disableCardsIndex = [1, 2, 7, 8, 9];
    const disableSprites = sprites.filter((sprite, index) => disableCardsIndex.includes(index));
    this.subject.disableCards(disableSprites);
    this.subject.showCards(sprites);
    const selectNumber = 0;
    this.cardsSelected = [];
    const selectHandler = (cards) => {
      this.cardsSelected = cards;
    };
    this.subject.selectMode(selectHandler, selectNumber);
  }

  asserts() {
    this.describe('Deve entrar em modo seleção com escolha!');
    this.expectTrue('Esta em modo seleção?', this.subject.isSelectMode());
    this.expectTrue('Deve ser zerado!', this.cardsSelected.length === 0);
  }
}