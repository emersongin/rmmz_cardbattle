class FlipTurnToDownCardSpriteTest extends SceneTest {
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
    this.subject.setTurnToUp();
    this.subject.show();
    this.subject.flipTurnToDown();
  }

  asserts() {
    this.describe('Deve virar o card para baixo!');
    this.expectTrue('Esta virado para baixo?', this.subject.isTurnedToDown());
    this.expectTrue('Esta aberto?', this.subject.isOpened());
  }
}