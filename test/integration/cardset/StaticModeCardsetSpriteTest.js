class StaticModeCardsetSpriteTest extends SceneTest {
  name = 'StaticModeCardsetSpriteTest';

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
    this.subject.showCards(sprites);
    this.subject.selectMode();
    this.test('Deve entrar em modo estático!', () => {
      this.subject.unselectMode();
    }, () => {
      this.assertTrue('Esta em modo estático?', this.subject.isStaticMode());
    });
  }
}