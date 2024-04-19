class ZoomOutCardSpriteTest extends SceneTest {
  card;
  scene;

  constructor(scene) {
    super();
    this.scene = scene;
    this.setTest();
  }

  setTest() {
    const card = this.generateCard();
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
    this.card.show();
    this.scene.addChild(this.card);
  }

  start() {
    return new Promise(resolve => {
      this.card.zoomOut();
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  }

}