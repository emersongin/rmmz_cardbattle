class ChainAcitonCardSpriteTest extends SceneTest {
  create() {
    const x = ScreenHelper.getCenterPosition(CardsetSprite.contentOriginalWidth());
    const y = ScreenHelper.getMiddlePosition(CardsetSprite.contentOriginalHeight());
    this.base = CardsetSprite.create(x, y);
    this.attachChild(this.base);
    this.base.setBackgroundColor('black');
    this.base.show();
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    this.addHiddenWatched(this.subject);
    const centerXPosition = ScreenHelper.getPositionInCenterOf(this.base.width, this.subject.width);
    const centerYPosition = 0;
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.subject.show();
    this.base.addChild(this.subject);
    const times = 1;
    this._chainActionActived = false;
    const chainAction = () => {
      this._chainActionActived = true;
      this.subject.damage(times, this._scene);
    }
    this.subject.damage(times, this._scene, chainAction);
  }

  start() {
    this.counter = (GameConst.FPS * 3);
  }

  asserts() {
    this.describe('Deve receber uma animação em cadeia!');
    this.expectTrue('Base é visível?', this.base.isVisible());
    this.expectWasTrue('Houve animação?', this.subject.isAnimationPlaying);
    this.expectTrue('Houve animação em cadeia?', this._chainActionActived);
  }
}