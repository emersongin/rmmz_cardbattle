class ShowCardSpriteTest {
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
    this.scene.addChild(this.card);
  }

  startTest() {
    this.card.x = Graphics.boxWidth / 2 - this.card.width / 2;
    this.card.y = Graphics.boxHeight / 2 - this.card.height / 2;
    this.card.show();
  } 

  update() {

  }

}