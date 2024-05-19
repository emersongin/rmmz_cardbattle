class MoveAllCardsToPositionCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.setCards(cards);
    const x = CardsetSprite.contentOriginalWidth() / 2;
    const y = 0;
    this.subject.show();
    this.subject.showCards(sprites);
    this.subject.moveAllCardsToPosition(sprites, x, y);
    this.sprites = sprites;
  }

  asserts() {
    this.describe('Deve mover todas as cartas para a posição!');
    const numCards = 6;
    const padding = 0;
    const x = CardsetSprite.contentOriginalWidth() / 2;
    const y = 0;
    const positions = CardsetSprite.createPositions(numCards, padding, x, y);
    this.assertTrue('Estão nas posições?', this.subject.isSpritesPositions(positions, this.sprites));
  }
}