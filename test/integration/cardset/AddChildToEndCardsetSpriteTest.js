class AddChildToEndCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    this.subject.showCards(sprites);
    const startSprite = sprites[0];
    this.subject.addChildToEnd(startSprite);
  }

  asserts() {
    this.describe('Deve adicionar o sprite ao final de todos os outros!');
    const sprites = this.subject.getSprites();
    const indexAmount = this.subject.getSprites().length - 1;
    const startSprite = sprites[0];
    const lastIndex = this.subject.children.indexOf(startSprite);
    this.expectTrue('O sprite está no final?', lastIndex === indexAmount);
  }
}