class SizeCardSpriteTest extends SceneTest {
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
  }

  asserts() {
    const cardWidth = 96;
    const cardHeight = 120;
    this.describe('Deve validar a proporção do card!');
    this.expectTrue('Esta com a largura informada?', this.subject.width === cardWidth);
    this.expectTrue('Esta com a altura informada?', this.subject.height === cardHeight);
    this.expectTrue('Esta aberto?', this.subject.isOpened());
  }
}