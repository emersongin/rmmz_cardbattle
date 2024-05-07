class InlineCardsCardsetSpriteTest extends SceneTest {
  name = 'InlineCardsCardsetSpriteTest';

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
    const sprites = this.subject.inlineCards(cards);
    this.test('Deve mostrar os cartões do set em posição de linha!', () => {
      this.subject.showCards(sprites);
    }, () => {
      const spaceBetween = 1;
      const padding = CardSprite.contentOriginalWidth() + spaceBetween;
      const positions = CardsetSprite.createPositions(numCards, padding);
      this.assertTrue('Esta mostrando na posição inícial?', this.subject.allCardsAreVisible());
      this.assertTrue('Estão nas posições?', this.subject.isSpritesPositions(positions, sprites));
    });
  }
}