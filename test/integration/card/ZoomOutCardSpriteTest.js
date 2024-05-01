class ZoomOutCardSpriteTest extends SceneTest {
  card;
  name = 'ZoomOutCardSpriteTest';

  create() {
    const card = Generator.generateCard();
    this.card = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    const centerXPosition = (Graphics.boxWidth / 2 - this.card.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.card.height / 2);
    this.card.x = centerXPosition - ((this.card.width / 2) / 2);
    this.card.y = centerYPosition - ((this.card.height / 2) / 2);
    this.card.scale.x = (this.card.scale.x / 2) * 3;
    this.card.scale.y = (this.card.scale.y / 2) * 3;
    this.addChild(this.card);
  }

  start() {
    this.card.show();
    this.test('Deve retonar a escala normal do cartão!', () => {
      this.card.zoomOut();
    }, () => {
      this.assertTrue('Esta em escala original?', this.card.isOriginalScale());
    });
  }
}