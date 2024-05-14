class ChangeDefaultColorCardBattleWindowBaseTest extends SceneTest {
  create() {
    this.subject = CardBattleWindowBase.createWindowFullSize(0, 0);
    this.addWatched(this.subject);
    this.subject.alignCenterMiddle();
    this.subject.changeDefaultColor();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve mudar a cor para default!');
    this.assertTrue('Esta na cor default?', this.subject.isDefaultColor());
  }
}