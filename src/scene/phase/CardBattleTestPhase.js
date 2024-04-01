class CardBattleTestPhase {
  scene;

  constructor(scene) {
    this.scene = scene;
    this.setTest();
    this.startTest();
  }

  setTest() {
    this.card = new CardSprite();
    this.card.setCard({
      type: CardTypes.BATTLE,
      color: CardColors.RED,
      name: 'Test Card',
      figureName: 'default',
      attack: 1,
      health: 1
    });
    this.scene.addChild(this.card);
  }

  startTest() {
    this.card.show();
  } 

  update() {

  }

}