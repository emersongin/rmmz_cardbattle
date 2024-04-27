class FlashCardSpriteTest extends SceneTest {
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
      setTimeout(() => {
        const color = 'white';
        const duration = 60;
        const times = 1;
        this.card.flash(color, duration, times);
        setTimeout(() => {
          this.scene.removeChild(this.card);
          resolve(true);
        }, 2000);
      }, 300);
    });
  } 

  testInfinityFlash() {
    this.card.show();
    setTimeout(() => {
      const color = 'white';
      const duration = 60;
      const infinity = -1;
      this.card.flash(color, duration, infinity);
      setTimeout(() => {
        this.card.stopFlash();
      }, 3000);
    }, 300);
  }

}