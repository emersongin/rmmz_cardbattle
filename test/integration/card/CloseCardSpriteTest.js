class CloseCardSpriteTest extends Test {
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
      this.card.close();
      setTimeout(() => {
        this.scene.removeChild(this.card);
        resolve(true);
      }, 1000);
    });
  }

  // exemplo de teste de unidade
  // this.update(() => {
  //   this.card.update();
  // });
  // this.assert(this.card._status).toBeInstanceof(CardSpriteStoppedState);
  // this.assert(this.card.width).toBe(0);
}