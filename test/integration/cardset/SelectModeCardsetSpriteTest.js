class SelectModeCardsetSpriteTest extends SceneTest {
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
    const unlimited = -1;
    this.cardsSelected = [];
    const onSelectHandler = (cards) => {
      this.cardsSelected = cards;
      endTest();
    };
    this.subject.selectMode(unlimited, onSelectHandler);
    this.subject.addCommand(() => {
      this.subject._status.selectSprite(0);
      this.subject._status.selectSprite(1);
      this.subject._status.selectSprite(2);
    });
  }

  asserts() {
    this.describe('Deve entrar em modo seleção com escolha!');
    this.expectTrue('Deve selecionar 3 cartas', this.cardsSelected.length === 3);
    this.expectWasTrue('Esta em modo seleção?', this.subject.isSelectMode);
  }
}