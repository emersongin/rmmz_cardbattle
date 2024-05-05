class DefaultColorCardBattleWindowBaseTest extends SceneTest {
  name = 'DefaultColorCardBattleWindowBaseTest';

  create() {
    this.subject = CardBattleWindowBase.createWindowFullSize(0, 0);
    this.subject.setCenteredAlignment();
    this.addWindow(this.subject);
  }

  start() {
    this.test('Deve estar na cor default!', () => {
      this.subject.changeDefaultColor();
      this.subject.open();
    }, () => {
      this.assertTrue('Esta na cor default?', this.subject.isDefaultColor());
    });
  }
}