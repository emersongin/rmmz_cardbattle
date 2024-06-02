class UniluminatedCardSpriteTest extends SceneTest {
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
    this.subject.iluminate();
    this.subject.uniluminate();
  }

  asserts() {
    this.describe('Deve retirar a iluminação do card!');
    this.expectTrue('Esta sem iluminado?', this.subject.isUniluminated());
  }
}