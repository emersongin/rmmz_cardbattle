class AddAllCardsToListCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    const addSprites = sprites.filter((sprite, index) => index >= 4);
    const screenWidth = Graphics.boxWidth;
    this.subject.show();
    this.subject.setAllCardsToPosition(addSprites, screenWidth);
    this.subject.showCards(sprites);
    this.subject.moveAllCardsInlist(sprites);
    this.sprites = sprites;
  }

  asserts() {
    this.describe('Deve adicionar todas as cartas na lista!');
    const numCards = 6;
    const positions = CardsetSprite.createPositionsList(numCards);
    this.assertTrue('Estão nas posições?', this.subject.isSpritesPositions(positions, this.sprites));
  }
}