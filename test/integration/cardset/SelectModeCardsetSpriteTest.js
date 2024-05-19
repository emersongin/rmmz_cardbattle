class SelectModeCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    const numCards = 10;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    this.subject.show();
    this.subject.showCards(sprites);
    this.subject.selectMode();
  }

  asserts() {
    this.describe('Deve entrar em modo seleção!');
    this.assertTrue('Esta em modo seleção?', this.subject.isSelectMode());
  }
}