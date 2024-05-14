class MoveAllCardsInListCardsetSpriteTest extends SceneTest {
  create() {
    const centerXPosition = (Graphics.boxWidth / 2 - CardsetSprite.contentOriginalWidth() / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - CardsetSprite.contentOriginalHeight() / 2);
    this.subject = CardsetSprite.create(centerXPosition, centerYPosition);
    this.addWatched(this.subject);
    this.subject.show();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const screenWidth = Graphics.boxWidth;
    const sprites = this.subject.setCards(cards, screenWidth);
    this.subject.showCards(sprites);
    this.subject.moveAllCardsInlist(sprites);
    this.sprites = sprites;
  }

  asserts() {
    this.describe('Deve mover todas as cartas!');
    const numCards = 6;
    const positions = CardsetSprite.createPositionsList(numCards);
    this.assertTrue('Estão nas posições?', this.subject.isSpritesPositions(positions, this.sprites));
  }
}