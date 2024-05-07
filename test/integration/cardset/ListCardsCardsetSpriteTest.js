class ListCardsCardsetSpriteTest extends SceneTest {
  name = 'ListCardsCardsetSpriteTest';

  create() {
    const centerXPosition = (Graphics.boxWidth / 2 - CardsetSprite.contentOriginalWidth() / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - CardsetSprite.contentOriginalHeight() / 2);
    this.subject = CardsetSprite.create(centerXPosition, centerYPosition);
    this.subject.show();
    this.addWatched(this.subject);
  }

  start() {
    const numCards = 40;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    this.test('Deve mostrar os cartões do set em posição de lista!', () => {
      this.subject.showCards(sprites);
    }, () => {
      const positions = CardsetSprite.createPositionsList(numCards);
      this.assertTrue('Esta mostrando na posição de lista?', this.subject.allCardsAreVisible());
      this.assertTrue('Estão nas posições?', this.subject.isSpritesPositions(positions, sprites));
    });
  }
}