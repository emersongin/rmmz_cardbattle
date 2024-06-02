class FlipTurnToUpCardSpriteTest extends SceneTest {
  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    this.addWatched(this.subject);
    const cardWidth = CardSprite.contentOriginalWidth();
    const cardHeight = CardSprite.contentOriginalHeight();
    const x = ScreenHelper.getCenterPosition(cardWidth);
    const y = ScreenHelper.getMiddlePosition(cardHeight);
    this.subject.startOpen(x, y);
    this.subject.setTurnToDown();
    this.subject.show();
    this.subject.flipTurnToUp();
  }

  asserts() {
    this.describe('Deve virar o card para cima!');
    this.expectTrue('Esta virado para cima?', this.subject.isTurnedToUp());
    this.expectTrue('Esta aberto?', this.subject.isOpened());
  }
}