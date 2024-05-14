class FlashCardsCardsetSpriteTest extends SceneTest {
  create() {
    const centerXPosition = (Graphics.boxWidth / 2 - CardsetSprite.contentOriginalWidth() / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - CardsetSprite.contentOriginalHeight() / 2);
    this.subject = CardsetSprite.create(centerXPosition, centerYPosition);
    this.attachChild(this.subject);
    this.subject.show();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    this.sprite = sprites[0];
    this.addHiddenWatched(this.sprite);
    this.subject.showCards(sprites);
    this.subject.flashCardsAnimate(sprites, 'orange');
  }

  asserts() {
    this.describe('Deve animar as cartas!');
    this.assertWasTrue('Houve um flash de luz?', this.sprite.isFlashPlaying);
  }
}