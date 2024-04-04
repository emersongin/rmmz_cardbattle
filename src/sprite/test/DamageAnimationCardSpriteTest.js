class DamageAnimationCardSpriteTest {
  card;
  scene;

  constructor(scene) {
    this.scene = scene;
    this.setTest();
    this.startTest();
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

  startTest() {
    this.card.show();
    setTimeout(() => {
      this.card.damageAnimation();
    }, 300);
  } 

  update() {

  }

}