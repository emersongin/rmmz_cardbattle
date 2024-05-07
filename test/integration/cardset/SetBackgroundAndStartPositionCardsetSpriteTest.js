class SetBackgroundAndStartPositionCardsetSpriteTest extends SceneTest {
  name = 'SetBackgroundAndStartPositionCardsetSpriteTest';

  create() {
    this.subject = CardsetSprite.create();
    this.subject.setBackgroundColor('rgba(255, 0, 0, 0.5)');
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startPosition(centerXPosition, centerYPosition);
    this.addWatched(this.subject);
  }

  start() {
    this.test('Deve apresentar o set de cartões!', () => {
      this.subject.show();
    }, () => {
      this.assertTrue('É visível?', this.subject.isVisible());
    });
  }
}