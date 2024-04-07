class QuakeCardSpriteTest extends Test {
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
      const times = 1;
      // this.card.damageAnimation(times);
      this.card.quake(times);
      setTimeout(() => {
        if (!this.card.isAnimationPlaying()) 
          this.scene.removeChild(this.card);
        resolve(true);
      }, 1000);
    });
  }

}