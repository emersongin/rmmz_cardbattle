class OpenAndCloseCardBattleWindowBaseTest extends SceneTest {
  name = 'OpenAndCloseCardBattleWindowBaseTest';

  create() {
    this.subject = CardBattleWindowBase.create(0, 0, Graphics.width, Graphics.height);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.setCenteredAlignment();
    this.test('Deve abrir e renderizar!', () => {
      this.subject.open();
    }, () => {
      this.assertTrue('Esta aberta?', this.subject.isOpen());
    });
    this.test('Deve abrir e renderizar!', () => {
      this.subject.close();
    }, () => {
      this.assertTrue('Esta fechada?', this.subject.isClosed());
    });
  }
}