class UpdatingPointsCardSpriteTest extends SceneTest {
  card;

  create() {
    const card = this.generateCard();
    this.card = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    const centerXPosition = (Graphics.boxWidth / 2 - this.card.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.card.height / 2);
    this.card.startOpen(centerXPosition, centerYPosition);
    this.card.show();
    this.scene.addChild(this.card);
  }

  start() {
    return new Promise(resolve => {
      this.card.changePoints(30, 30);
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });
  }

}