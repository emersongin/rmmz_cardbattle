class SetCardsCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const cards = CardGenerator.generateCards(1);
    const sprites = this.subject.setCards(cards);
    this.subject.showCards(sprites);
    this.sprites = sprites;
  }

  asserts() {
    this.describe('Deve mostrar as cartas!');
    const numCards = 1;
    const padding = 0;
    const x = 0;
    const y = 0;
    const positions = CardsetSprite.createPositions(numCards, padding, x, y);
    this.assertTrue('Esta mostrando na posição inícial?', this.subject.allCardsAreVisible());
    this.assertTrue('Estão nas posições?', this.subject.isSpritesPositions(positions, this.sprites));
  }
}