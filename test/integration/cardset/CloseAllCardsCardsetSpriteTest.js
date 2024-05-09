class CloseAllCardsCardsetSpriteTest extends SceneTest {
  name = 'CloseAllCardsCardsetSpriteTest';

  create() {
    const centerXPosition = (Graphics.boxWidth / 2 - CardsetSprite.contentOriginalWidth() / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - CardsetSprite.contentOriginalHeight() / 2);
    this.subject = CardsetSprite.create(centerXPosition, centerYPosition);
    this.subject.show();
    this.addWatched(this.subject);
  }

  start() {
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    this.subject.showCards(sprites);
    this.test('Deve fechar todos os cartões do set!', () => {
      this.subject.closeAllCards(sprites);
    }, () => {
      this.assertTrue('Estão fechados?', this.subject.allCardsIsClosed(sprites));
    });
  }
}