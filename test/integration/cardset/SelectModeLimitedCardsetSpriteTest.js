class SelectModeLimitedCardsetSpriteTest extends SceneTest {
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
    const endTest = this.createHandler();
    const selectNumber = 1;
    this.cardsSelected = [];
    const onSelectHandler = (cards) => {
      this.cardsSelected = cards;
      endTest();
    };
    this.subject.selectMode(selectNumber, onSelectHandler);
  }

  update() {
    if (this.subject.isSelectMode()) {
      this.subject._status.selectSprite(0);
      this.subject._status.selectSprite(1);
      this.subject._status.selectSprite(2);
    }
  }

  asserts() {
    this.describe('Deve entrar em modo seleção com escolha!');
    this.expectTrue('Deve selecionar 1 cartas', this.cardsSelected.length === 1);
    this.expectWasTrue('Esta em modo seleção?', this.subject.isSelectMode);
  }
}