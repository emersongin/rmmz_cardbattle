class SelectModeWithChoiceCardsetSpriteTest extends SceneTest {
  create() {
    const centerXPosition = (Graphics.boxWidth / 2 - CardsetSprite.contentOriginalWidth() / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - CardsetSprite.contentOriginalHeight() / 2);
    this.subject = CardsetSprite.create(centerXPosition, centerYPosition);
    this.addWatched(this.subject);
    this.subject.show();
    const numCards = 10;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    const disableCardsIndex = [1, 2, 7, 8, 9];
    const disableSprites = sprites.filter((sprite, index) => disableCardsIndex.includes(index));
    this.subject.disableCards(disableSprites);
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