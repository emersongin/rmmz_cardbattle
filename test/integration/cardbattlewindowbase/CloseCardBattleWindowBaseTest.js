class CloseCardBattleWindowBaseTest extends SceneTest {
  name = 'CloseCardBattleWindowBaseTest';

  create() {
    this.subject = CardBattleWindowBase.createWindowFullSize(0, 0);
    this.subject.alignCenterMiddle();
    this.addWindow(this.subject);
  }

  start() {
    this.subject.open();
    this.test('Deve fechar!', () => {
      this.subject.close();
    }, () => {
      this.assertTrue('Esta fechada?', this.subject.isClosed());
    });
  }
}