class LeaveCardSpriteTest extends SceneTest {
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
    this.subject.leave();
  }

  asserts() {
    this.describe('Deve colocar o card em leave!');
    this.expect('Esta em largura zerada?', this.subject.width).toBe(0);
    this.expect('Esta em altura zerada?', this.subject.height).toBe(0);
    this.expectTrue('Esta invisível?', this.subject.isHidden());
  }
}