class MoveCardSpriteTest {
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
    this.card.x = 0;
    this.card.y = 0;
    this.scene.addChild(this.card);
  }

  startTest() {
    const destinyXPosition = (Graphics.boxWidth / 2 - this.card.width / 2);
    const destinyYPosition = (Graphics.boxHeight / 2 - this.card.height / 2);
    this.card.show();
    this.card.toMove(destinyXPosition, destinyYPosition);
  } 

  update() {

  }

}