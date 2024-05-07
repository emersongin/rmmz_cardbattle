class ChangeRedColorCardBattleWindowBaseTest extends SceneTest {
  name = 'ChangeRedColorCardBattleWindowBaseTest';

  create() {
    this.subject = CardBattleWindowBase.createWindowFullSize(0, 0);
    this.subject.alignCenterMiddle();
    this.addWatched(this.subject);
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