class FullSizeCardBattleWindowBaseTest extends SceneTest {
  name = 'FullSizeCardBattleWindowBaseTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = CardBattleWindowBase.createWindowFullSize(x, y);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.show();
    this.test('Deve ter a largura total da tela!', () => {
      this.subject.open();
    }, () => {
      this.assertTrue('Esta na largura total da tela?', this.subject.isFullsize());
    });
  }

}