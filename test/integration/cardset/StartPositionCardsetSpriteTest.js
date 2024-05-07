class StartPositionCardsetSpriteTest extends SceneTest {
  name = 'StartPositionCardsetSpriteTest';

  create() {
    this.subject = CardsetSprite.create();
    this.addWatched(this.subject);
  }

  start() {
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.test('Deve mostrar o set no meio!', () => {
      this.subject.startPosition(centerXPosition, centerYPosition);
      this.subject.show();
    }, () => {
      this.assertTrue('Esta no meio?', this.subject.isVisible());
      this.assert('Esta na posição x?', this.subject.x).toBe(centerXPosition);
      this.assert('Esta na posição y?', this.subject.y).toBe(centerYPosition);
    });
  }
}