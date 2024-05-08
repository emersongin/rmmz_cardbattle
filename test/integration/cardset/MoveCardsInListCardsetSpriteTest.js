class MoveCardsInListCardsetSpriteTest extends SceneTest {
  name = 'MoveCardsInListCardsetSpriteTest';

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
    const screenWidth = Graphics.boxWidth;
    const sprites = this.subject.setCards(cards, screenWidth);
    this.subject.showCards(sprites);
    this.test('Deve mover os cartões do set na posição em lista!', () => {
      this.subject.moveCardsInlist(sprites);
    }, () => {
      const positions = CardsetSprite.createPositionsList(numCards);
      this.assertTrue('Estão nas posições?', this.subject.isSpritesPositions(positions, sprites));
    });
  }
}