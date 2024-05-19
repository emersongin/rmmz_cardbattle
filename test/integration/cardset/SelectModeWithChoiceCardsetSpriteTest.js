class SelectModeWithChoiceCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    const numCards = 10;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    const disableCardsIndex = [1, 2, 7, 8, 9];
    const disableSprites = sprites.filter((sprite, index) => disableCardsIndex.includes(index));
    this.subject.disableCards(disableSprites);
    this.subject.show();
    this.subject.showCards(sprites);
    this.subject.selectMode();
    this.subject.enableChoice();
  }

  asserts() {
    this.describe('Deve entrar em modo seleção com escolha!');
    this.assertTrue('Esta em modo seleção?', this.subject.isSelectMode());
    this.assertTrue('Esta com escolha habilitada?', this.subject.isEnableChoice());
  }
}