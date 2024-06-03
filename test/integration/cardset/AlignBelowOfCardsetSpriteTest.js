class AlignBelowOfCardsetSpriteTest extends SceneTest {
  create() {
    const x = ScreenHelper.getCenterPosition(CardsetSprite.contentOriginalWidth());
    const y = ScreenHelper.getMiddlePosition(CardsetSprite.contentOriginalHeight());
    this.base = CardsetSprite.create(x, y);
    this.base.setBackgroundColor('blue');
    this.attachChild(this.base);
    this.subject = CardsetSprite.create(0, 0);
    this.subject.setBackgroundColor('orange');
    this.subject.alignBelowOf(this.base);
    this.addWatched(this.subject);
    this.subject.show();
    this.base.show();
  }

  asserts() {
    this.describe('Deve alinhar no centro e acima do meio!');
    const y = ScreenHelper.getPositionBelowOf(this.base.y, this.subject.height);
    this.expectTrue('Esta na posição vertical acima do meio?', this.subject.y === y);
  }
}