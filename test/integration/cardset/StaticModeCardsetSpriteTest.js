class StaticModeCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 10;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    this.subject.showCards(sprites);
    this.subject.selectMode();
    this.subject.staticMode();
  }

  asserts() {
    this.describe('Deve entrar em modo estático!');
    this.expectTrue('Esta em modo estático?', this.subject.isStaticMode());
  }
}