class ChangeBlueColorCardBattleWindowBaseTest extends SceneTest {
  create() {
    this.subject = CardBattleWindowBase.createWindowFullSize(0, 0);
    this.subject.alignCenterMiddle();
    this.addWatched(this.subject);
    this.subject.changeBlueColor();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve mudar a cor para azul!');
    this.assertTrue('Esta na cor azul?', this.subject.isBlueColor());
  }
}