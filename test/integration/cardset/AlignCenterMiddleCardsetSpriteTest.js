class AlignCenterMiddleCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.subject.setBackgroundColor('blue');
    this.subject.alignCenterMiddle();
    this.addWatched(this.subject);
    this.subject.show();
  }

  asserts() {
    this.describe('Deve alinhar no centro e no meio!');
    const x = ScreenHelper.getCenterPosition(CardsetSprite.contentOriginalWidth());
    const y = ScreenHelper.getMiddlePosition(CardsetSprite.contentOriginalHeight());
    this.expectTrue('Esta na posição centralizada?', this.subject.y === y && this.subject.x === x);
  }
}