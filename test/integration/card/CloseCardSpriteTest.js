class CloseCardSpriteTest extends SceneTest {
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
    this.subject.close();
  }

  asserts() {
    this.describe('Deve fechar o card!');
    this.expectTrue('Esta fechado?', this.subject.isClosed());
  }
}