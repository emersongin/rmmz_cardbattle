class MoveAllCardsToPositionCardsetSpriteTest extends SceneTest {
  name = 'MoveAllCardsToPositionCardsetSpriteTest';

  create() {
    const centerXPosition = (Graphics.boxWidth / 2 - CardsetSprite.contentOriginalWidth() / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - CardsetSprite.contentOriginalHeight() / 2);
    this.subject = CardsetSprite.create(centerXPosition, centerYPosition);
    this.subject.show();
    this.addWatched(this.subject);
  }

  start() {
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.setCards(cards);
    const x = CardsetSprite.contentOriginalWidth() / 2;
    const y = 0;
    this.subject.showCards(sprites);
    this.test('Deve mover os cartões do set na posição definida!', () => {
      this.subject.moveAllCardsToPosition(sprites, x, y);
    }, () => {
      const padding = 0;
      const positions = CardsetSprite.createPositions(numCards, padding, x, y);
      this.assertTrue('Estão nas posições?', this.subject.isSpritesPositions(positions, sprites));
    });
  }
}