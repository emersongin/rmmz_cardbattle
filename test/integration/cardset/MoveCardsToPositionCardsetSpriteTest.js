class MoveCardsToPositionCardsetSpriteTest extends SceneTest {
  create() {
    const centerXPosition = (Graphics.boxWidth / 2 - CardsetSprite.contentOriginalWidth() / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - CardsetSprite.contentOriginalHeight() / 2);
    this.subject = CardsetSprite.create(centerXPosition, centerYPosition);
    this.addWatched(this.subject);
    this.subject.show();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.setCards(cards);
    const x = CardsetSprite.contentOriginalWidth() / 2;
    const y = 0;
    this.subject.showCards(sprites);
    this.subject.moveCardsToPosition(sprites, x, y);
    this.sprites = sprites;
  }

  asserts() {
    this.describe('Deve mover as cartas para a posição!');
    const numCards = 6;
    const padding = 0;
    const x = CardsetSprite.contentOriginalWidth() / 2;
    const y = 0;
    const positions = CardsetSprite.createPositions(numCards, padding, x, y);
    this.assertTrue('Estão nas posições?', this.subject.isSpritesPositions(positions, this.sprites));
  }
}