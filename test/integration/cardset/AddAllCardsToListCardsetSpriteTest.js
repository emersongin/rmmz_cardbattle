class AddAllCardsToListCardsetSpriteTest extends SceneTest {
  create() {
    const centerXPosition = (Graphics.boxWidth / 2 - CardsetSprite.contentOriginalWidth() / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - CardsetSprite.contentOriginalHeight() / 2);
    this.subject = CardsetSprite.create(centerXPosition, centerYPosition);
    this.addWatched(this.subject);
    this.subject.show();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    const addSprites = sprites.filter((sprite, index) => index >= 4);
    const screenWidth = Graphics.boxWidth;
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