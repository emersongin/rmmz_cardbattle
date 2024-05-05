class RedColorCardBattleWindowBaseTest extends SceneTest {
  name = 'RedColorCardBattleWindowBaseTest';

  create() {
    this.subject = CardBattleWindowBase.createWindowFullSize(0, 0);
    this.subject.setCenteredAlignment();
    this.addWindow(this.subject);
  }

  start() {
    this.test('Deve estar na cor vermelha!', () => {
      this.subject.changeRedColor();
      this.subject.open();
    }, () => {
      this.assertTrue('Esta na cor vermelha?', this.subject.isRedColor());
    });
  }
}