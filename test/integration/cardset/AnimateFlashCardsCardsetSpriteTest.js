class AnimateFlashCardsCardsetSpriteTest extends SceneTest {
  name = 'AnimateFlashCardsCardsetSpriteTest';

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
    this.test('Deve animar os cartões com flash!', () => {
      this.subject.showCards(sprites);
      this.subject.flashCardsAnimate(sprites);
    }, () => {
      this.assertWasTrue('Houve um flash de luz?', this.subject.someSpriteIsFlashPlaying);
    });
  }
}