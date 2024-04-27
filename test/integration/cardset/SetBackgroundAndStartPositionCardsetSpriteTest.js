class SetBackgroundAndStartPositionCardsetSpriteTest extends SceneTest {
  cardset;

  create() {
    this.cardset = CardsetSprite.create();
    this.scene.addChild(this.cardset);
  }

  start() {
    return new Promise(resolve => {
      const centerXPosition = (Graphics.boxWidth / 2 - this.cardset.width / 2);
      const centerYPosition = (Graphics.boxHeight / 2 - this.cardset.height / 2);
      this.cardset.setBackgroundColor('rgba(255, 0, 0, 0.5)');
      this.cardset.startPosition(centerXPosition, centerYPosition);
      this.cardset.show();
      setTimeout(() => {
        this.cardset.clear();
        resolve(true);
      }, 1000);
    });
  }

}