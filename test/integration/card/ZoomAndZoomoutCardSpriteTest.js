class ZoomAndZoomoutCardSpriteTest extends SceneTest {
  name = 'ZoomAndZoomoutCardSpriteTest';

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
    this.addChild(this.subject);
  }

  start() {
    this.subject.show();
    this.test('Deve amplicar!', () => {
      this.subject.zoom();
    }, () => {
      this.assertTrue('Esta ampliado?', this.subject.isZoom());
    });
    this.test('Deve retonar a escala normal!', () => {
      this.subject.zoomOut();
    }, () => {
      this.assertTrue('Esta em escala original?', this.subject.isOriginalScale());
    });
  }
}