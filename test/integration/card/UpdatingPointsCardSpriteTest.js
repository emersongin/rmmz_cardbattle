class UpdatingPointsCardSpriteTest extends Test {
  card;
  scene;

  constructor(scene) {
    super();
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
    this.card.startOpen(centerXPosition, centerYPosition);
    this.scene.addChild(this.card);
  }

  start() {
    return new Promise(resolve => {
      this.card.changePoints(30, 30);
      setTimeout(() => {
        this.scene.removeChild(this.card);
        resolve(true);
      }, 2000);
    });
  }

}