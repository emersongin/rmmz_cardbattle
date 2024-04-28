class SetBackgroundAndStartPositionCardsetSpriteTest extends SceneTest {
  cardset;

  create() {
    this.cardset = CardsetSprite.create();
    this.cardset.setBackgroundColor('rgba(255, 0, 0, 0.5)');
    const centerXPosition = (Graphics.boxWidth / 2 - this.cardset.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.cardset.height / 2);
    this.cardset.startPosition(centerXPosition, centerYPosition);
  }

  start() {
    return new Promise(resolve => {
      this.scene.addChild(this.cardset);
      this.cardset.show();
      setTimeout(() => {
        this.cardset.clear();
        resolve(true);
      }, 1000);
    });
  }

}