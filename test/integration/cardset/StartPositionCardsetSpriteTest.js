class StartPositionCardsetSpriteTest extends SceneTest {
  create() {
    const centerXPosition = (Graphics.boxWidth / 2 - CardsetSprite.contentOriginalWidth() / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - CardsetSprite.contentOriginalHeight() / 2);
    this.subject = CardsetSprite.create(centerXPosition, centerYPosition);
    this.addWatched(this.subject);
    this.subject.show();
  }

  asserts() {
    const centerXPosition = (Graphics.boxWidth / 2 - CardsetSprite.contentOriginalWidth() / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - CardsetSprite.contentOriginalHeight() / 2);
    this.describe('Deve iniciar na posição central!');
    this.assertTrue('Esta no meio?', this.subject.isVisible());
    this.assert('Esta na posição x?', this.subject.x).toBe(centerXPosition);
    this.assert('Esta na posição y?', this.subject.y).toBe(centerYPosition);
  }
}