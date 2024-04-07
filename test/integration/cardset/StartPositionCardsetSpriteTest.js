class StartPositionCardsetSpriteTest extends Test {
  cardset;
  scene;

  constructor(scene) {
    super();
    this.scene = scene;
    this.setTest();
  }

  setTest() {
    this.cardset = CardsetSprite.create();
    this.scene.addChild(this.cardset);
  }

  start() {
    return new Promise(resolve => {
      const centerXPosition = (Graphics.boxWidth / 2 - this.cardset.width / 2);
      const centerYPosition = (Graphics.boxHeight / 2 - this.cardset.height / 2);
      this.cardset.setBackGroundColor('rgba(255, 0, 0, 0.5)');
      this.cardset.startPosition(centerXPosition, centerYPosition);
      setTimeout(() => {
        this.scene.removeChild(this.cardset);
        resolve(true);
      }, 1000);
    });
  }

}