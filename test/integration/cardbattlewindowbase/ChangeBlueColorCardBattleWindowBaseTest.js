class ChangeBlueColorCardBattleWindowBaseTest extends SceneTest {
  name = 'ChangeBlueColorCardBattleWindowBaseTest';

  create() {
    this.subject = CardBattleWindowBase.createWindowFullSize(0, 0);
    this.subject.alignCenterMiddle();
    this.addWatched(this.subject);
  }

  start() {
    this.test('Deve estar na cor azul!', () => {
      this.subject.changeBlueColor();
      this.subject.open();
    }, () => {
      this.assertTrue('Esta na cor azul?', this.subject.isBlueColor());
    });
  }
}