class ListCardsCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    this.subject.show();
    this.subject.showCards(sprites);
    this.sprites = sprites;
  }

  asserts() {
    this.describe('Deve listar as cartas!');
    const numCards = 6;
    const positions = CardsetSprite.createPositionsList(numCards);
    this.assertTrue('Esta mostrando na posição de lista?', this.subject.allCardsAreVisible());
    this.assertTrue('Estão nas posições?', this.subject.isSpritesPositions(positions, this.sprites));
  }
}