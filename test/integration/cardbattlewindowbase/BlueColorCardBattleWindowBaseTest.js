class BlueColorCardBattleWindowBaseTest extends SceneTest {
  name = 'BlueColorCardBattleWindowBaseTest';

  create() {
    this.subject = CardBattleWindowBase.createWindowFullSize(0, 0);
    this.subject.setCenteredAlignment();
    this.addWindow(this.subject);
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