class DamageAnimationCardSpriteTest extends SceneTest {
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
      const times = 1;
      this.scene.addChild(this.card);
      this.card.show();
      this.card.damage(times);
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });
  }

}