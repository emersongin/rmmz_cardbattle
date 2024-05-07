class ChangeDefaultColorCardBattleWindowBaseTest extends SceneTest {
  name = 'ChangeDefaultColorCardBattleWindowBaseTest';

  create() {
    this.subject = CardBattleWindowBase.createWindowFullSize(0, 0);
    this.subject.alignCenterMiddle();
    this.addWatched(this.subject);
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