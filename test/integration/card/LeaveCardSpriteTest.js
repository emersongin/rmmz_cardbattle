class LeaveCardSpriteTest extends SceneTest {
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
  }

  start() {
    return new Promise(resolve => {
      this.scene.addChild(this.card);
      this.card.show();
      this.card.leave();
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  }

}