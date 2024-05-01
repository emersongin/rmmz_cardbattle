class SetBackgroundAndStartPositionCardsetSpriteTest extends SceneTest {
  cardset;
  name = 'SetBackgroundAndStartPositionCardsetSpriteTest';

  create() {
    this.cardset = CardsetSprite.create();
    this.cardset.setBackgroundColor('rgba(255, 0, 0, 0.5)');
    const centerXPosition = (Graphics.boxWidth / 2 - this.cardset.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.cardset.height / 2);
    this.cardset.startPosition(centerXPosition, centerYPosition);
    this.addChild(this.cardset);
  }

  start() {
    this.test('Deve apresentar o set de cartões!', () => {
      this.cardset.show();
    }, () => {
      this.assertTrue('É visível?', this.cardset.isVisible());
    });
  }
}