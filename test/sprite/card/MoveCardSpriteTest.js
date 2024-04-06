class MoveCardSpriteTest {
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
    this.card.x = 0;
    this.card.y = 0;
    this.scene.addChild(this.card);
  }

  start() {
    return new Promise(resolve => {
      const destinyXPosition = (Graphics.boxWidth / 2 - this.card.width / 2);
      const destinyYPosition = (Graphics.boxHeight / 2 - this.card.height / 2);
      this.card.show();
      this.card.toMove(destinyXPosition, destinyYPosition);
      const avanceXposition = (Graphics.boxWidth - this.card.width);
      this.card.toMove(avanceXposition, destinyYPosition);
      const avanceYposition = (Graphics.boxHeight - this.card.height);
      this.card.toMove(avanceXposition, avanceYposition);
      this.card.toMove(destinyXPosition, avanceYposition);
      const returnStartPosition = 0;
      this.card.toMove(returnStartPosition, returnStartPosition);
      this.card.toMove(destinyXPosition, destinyYPosition);
      setTimeout(() => {
        this.scene.removeChild(this.card);
        resolve(true);
      }, 2000);
    });
  }

  update() {

  }

}