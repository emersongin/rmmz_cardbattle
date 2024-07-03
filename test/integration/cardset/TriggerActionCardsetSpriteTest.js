class TriggerActionCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    this.subject.showCards(sprites);
    const times = 1;
    this._triggerActionActived = false;
    const triggerAction = () => {
      this._triggerActionActived = true;
      this.subject.damageCardsAnimate(times, sprites, this._scene, triggerAction);
    }
    this.subject.damageCardsAnimate(times, sprites, this._scene, triggerAction);
  }

  start() {
    this.counter = (GameConst.FPS * 3);
  }

  asserts() {
    this.describe('Deve animar as cartas!');
    this.expectWasTrue('Houve um frame de animação?', this.subject.someSpriteIsAnimationPlaying);
    this.expectTrue('Houve animação em cadeia?', this._triggerActionActived);
  }
}