class UpdatingPointsCardSpriteTest extends SceneTest {
  create() {
    const card = CardGenerator.generateCard(CardTypes.BATTLE);
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      0,
      0
    );
    this.addWatched(this.subject);
    const cardWidth = CardSprite.contentOriginalWidth();
    const cardHeight = CardSprite.contentOriginalHeight();
    const x = ScreenHelper.getCenterPosition(cardWidth);
    const y = ScreenHelper.getMiddlePosition(cardHeight);
    this.subject.startOpen(x, y);
    this.subject.show();
    this.subject.changePoints(25, 18);
  }

  asserts() {
    this.describe('Deve atualizar os pontos do card!');
    this.expectWasTrue('Foram atualizandos?', this.subject.isUpdatingPoints);
  }
}