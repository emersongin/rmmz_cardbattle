class StartOpenCardSpriteTest extends SceneTest {
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
    this.scene.addChild(this.card);
  }

  start() {
    return new Promise(resolve => {
      const centerXPosition = (Graphics.boxWidth / 2 - this.card.width / 2);
      const centerYPosition = (Graphics.boxHeight / 2 - this.card.height / 2);
      this.card.startOpen(centerXPosition, centerYPosition);
      this.card.show();
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  }

}