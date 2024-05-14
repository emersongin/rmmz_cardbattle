class StartPositionCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create();
    this.addWatched(this.subject);
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startPosition(centerXPosition, centerYPosition);
    this.subject.show();
  }

  asserts() {
    this.describe('Deve iniciar na posição central!');
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.assertTrue('Esta no meio?', this.subject.isVisible());
    this.assert('Esta na posição x?', this.subject.x).toBe(centerXPosition);
    this.assert('Esta na posição y?', this.subject.y).toBe(centerYPosition);
  }
}