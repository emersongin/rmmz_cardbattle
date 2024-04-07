class StartClosedCardSpriteTest extends Test {
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
    this.scene.addChild(this.card);
  }

  start() {
    return new Promise(resolve => {
      const centerXPosition = (Graphics.boxWidth / 2 - this.card.width / 2);
      const centerYPosition = (Graphics.boxHeight / 2 - this.card.height / 2);
      this.card.startClosed(centerXPosition, centerYPosition);
      setTimeout(() => {
        this.card.open();
        setTimeout(() => {
          this.scene.removeChild(this.card);
          resolve(true);
        }, 1000);
      }, 1000);
    });
  }

}