class OpenCardBattleWindowBaseTest extends SceneTest {
  name = 'OpenCardBattleWindowBaseTest';

  create() {
    this.subject = CardBattleWindowBase.createWindowFullSize(0, 0);
    this.subject.alignCenterMiddle();
    this.addWindow(this.subject);
  }

  start() {
    this.test('Deve abrir!', () => {
      this.subject.open();
    }, () => {
      this.assertTrue('Esta aberta?', this.subject.isOpen());
    });
  }
}