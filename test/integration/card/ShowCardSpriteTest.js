class ShowCardSpriteTest extends Test {
  card;
  scene;

  constructor(scene) {
    this.scene = scene;
    this.setTest();
  }

  setTest() {
    this.card = CardSprite.create(
      CardTypes.BATTLE,
      CardColors.BLUE,
      'default',
      1,
      1
    );
    const centerXPosition = (Graphics.boxWidth / 2 - this.card.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.card.height / 2);
    this.card.x = centerXPosition;
    this.card.y = centerYPosition;
    this.scene.addChild(this.card);
  }

  start() {
    return new Promise(resolve => {
      this.card.show();
      setTimeout(() => {
        this.scene.removeChild(this.card);
        resolve(true);
      }, 1000);
    });
  }

}