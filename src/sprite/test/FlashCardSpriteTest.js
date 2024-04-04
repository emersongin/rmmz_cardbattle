class FlashCardSpriteTest {
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
        const color = 'white';
        const duration = 60;
        const times = 1;
        this.card.flash(color, duration, times);
        setTimeout(() => {
          this.scene.removeChild(this.card);
          resolve(true);
        }, 2000);
      }, 300);
    });
  } 

  testInfinityFlash() {
    this.card.show();
    setTimeout(() => {
      const color = 'white';
      const duration = 60;
      const infinity = -1;
      this.card.flash(color, duration, infinity);
      setTimeout(() => {
        this.card.stopFlash();
      }, 3000);
    }, 300);
  }

  update() {

  }

}