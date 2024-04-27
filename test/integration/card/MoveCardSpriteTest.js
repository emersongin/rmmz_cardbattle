class MoveCardSpriteTest extends SceneTest {
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
    this.card.startOpen(0, 0);
    this.card.show();
    this.scene.addChild(this.card);
  }

  start() {
    return new Promise(resolve => {
      const destinyXPosition = (Graphics.boxWidth / 2 - this.card.width / 2);
      const destinyYPosition = (Graphics.boxHeight / 2 - this.card.height / 2);
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
        resolve(true);
      }, 2000);
    });
  }

}