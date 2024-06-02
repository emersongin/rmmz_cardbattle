class QuakeCardSpriteTest extends SceneTest {
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
    this.subject.show();
    const times = 10;
    this.subject.quake(times);
  }

  asserts() {
    this.describe('Deve tremer o card!');
    this.expectWasTrue('Houve um movimento?', this.subject.isMoving);
  }
}