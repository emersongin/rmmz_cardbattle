class SetCardsCardsetSpriteTest extends SceneTest {
  name = 'SetCardsCardsetSpriteTest';

  create() {
    const centerXPosition = (Graphics.boxWidth / 2 - CardsetSprite.contentOriginalWidth() / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - CardsetSprite.contentOriginalHeight() / 2);
    this.subject = CardsetSprite.create(centerXPosition, centerYPosition);
    this.subject.show();
    this.addWatched(this.subject);
  }

  start() {
    const cards = CardGenerator.generateCards(1);
    const sprites = this.subject.setCards(cards);
    this.test('Deve mostrar os cartões do set na posição inícial!', () => {
      this.subject.showCards(sprites);
    }, () => {
      const numCards = 1;
      const padding = 0;
      const x = 0;
      const y = 0;
      const positions = CardsetSprite.createPositions(numCards, padding, x, y);
      this.assertTrue('Esta mostrando na posição inícial?', this.subject.allCardsAreVisible());
      this.assertTrue('Estão nas posições?', this.subject.isSpritesPositions(positions, sprites));
    });
  }
}