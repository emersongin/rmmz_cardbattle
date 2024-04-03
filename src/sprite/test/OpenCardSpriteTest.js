class OpenCardSpriteTest {
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
    const cardWidthHalf = (this.card.width / 2);
    this.card.x = centerXPosition + cardWidthHalf;
    this.card.y = centerYPosition;
    this.card.width = 0;
    this.scene.addChild(this.card);
  }

  startTest() {
    this.card.show();
    this.card.open();
  } 

  update() {

  }

}