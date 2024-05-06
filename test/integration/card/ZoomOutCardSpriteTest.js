class ZoomOutCardSpriteTest extends SceneTest {
  name = 'ZoomOutCardSpriteTest';

  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.subject.show();
    this.addWatched(this.subject);
  }

  start() {
    this.subject.zoom();
    this.test('Deve retonar a escala normal!', () => {
      this.subject.zoomOut();
    }, () => {
      this.assertTrue('Esta em escala original?', this.subject.isOriginalScale());
    });
  }
}