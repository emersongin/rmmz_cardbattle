class MoveAllCardsToPositionsCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 2;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.setCards(cards);
    const position1 = CardSprite.createPosition(0, -CardSprite.contentOriginalHeight(), 0);
    const position2 = CardSprite.createPosition(CardSprite.contentOriginalWidth(), CardSprite.contentOriginalHeight(), 1);
    const positions = [position1, position2];
    this.subject.showCards(sprites);
    this.subject.moveAllCardsToPositions(sprites, positions);
    this.sprites = sprites;
  }

  asserts() {
    this.describe('Deve mover todas as cartas para a posição!');
    const position1 = CardSprite.createPosition(0, -CardSprite.contentOriginalHeight(), 0);
    const position2 = CardSprite.createPosition(CardSprite.contentOriginalWidth(), CardSprite.contentOriginalHeight(), 1);
    const positions = [position1, position2];
    this.expectTrue('Estão nas posições?', this.subject.isSpritesPositions(positions, this.sprites));
  }
}