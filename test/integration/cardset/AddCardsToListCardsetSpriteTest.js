class AddCardsToListCardsetSpriteTest extends SceneTest {
  name = 'AddCardsToListCardsetSpriteTest';

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
    const sprites = this.subject.listCards(cards);
    const addSprites = sprites.filter((sprite, index) => index >= 4);
    const screenWidth = Graphics.boxWidth;
    this.subject.setAllCardsToPosition(addSprites, screenWidth);
    this.subject.showCards(sprites);
    this.test('Deve mover os cartões adicionados ao set na posição em lista!', () => {
      this.subject.moveCardsInlist(sprites);
    }, () => {
      const positions = CardsetSprite.createPositionsList(numCards);
      this.assertTrue('Estão nas posições?', this.subject.isSpritesPositions(positions, sprites));
    });
  }
}