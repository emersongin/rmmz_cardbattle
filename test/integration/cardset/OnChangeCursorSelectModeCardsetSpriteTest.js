class OnChangeCursorSelectModeCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 10;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    const disableCardsIndex = [3, 4, 5, 6, 7, 8, 9];
    const disableSprites = sprites.filter((sprite, index) => disableCardsIndex.includes(index));
    this.subject.disableCards(disableSprites);
    this.subject.showCards(sprites);
    const endTest = this.createHandler();
    const noSelect = 0;
    this.currentIndex = null;
    const onSelectHandler = () => {};
    const onChangeCursor = (index) => {
      this.currentIndex = index;
      endTest();
    };
    this.subject.selectMode(noSelect, onSelectHandler, onChangeCursor);
  }

  asserts() {
    this.describe('Deve entrar em modo seleção com escolha!');
    this.expectTrue('Foi obtido um numerico ao movimentar curso?', typeof this.currentIndex === 'number');
    this.expectWasTrue('Esta em modo seleção?', this.subject.isSelectMode);
  }
}