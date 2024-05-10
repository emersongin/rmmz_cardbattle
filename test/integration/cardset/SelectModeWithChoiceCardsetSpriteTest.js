class SelectModeWithChoiceCardsetSpriteTest extends SceneTest {
  name = 'SelectModeWithChoiceCardsetSpriteTest';

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
    const sprites = this.subject.listCards(cards);
    const disableCardsIndex = [1, 2, 7, 8, 9];
    const disableSprites = sprites.filter((sprite, index) => disableCardsIndex.includes(index));
    this.subject.disableCards(disableSprites);
    this.subject.showCards(sprites);
    this.test('Deve entrar em modo seleção com escolha!', () => {
      this.subject.selectMode();
      this.subject.enableChoice();
    }, () => {
      this.assertTrue('Esta em modo seleção?', this.subject.isSelectMode());
      this.assertTrue('Esta com escolha habilitada?', this.subject.isEnableChoice());
    });
  }
}