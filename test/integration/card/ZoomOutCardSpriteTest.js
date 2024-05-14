class ZoomOutCardSpriteTest extends SceneTest {
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
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.subject.show();
    this.subject.zoom();
    this.subject.zoomOut();
  }

  asserts() {
    this.describe('Deve colocar o card em escala original!');
    this.assertTrue('Esta em escala original?', this.subject.isOriginalScale());
  }
}