class SetFullSizeCardBattleWindowBaseTest extends SceneTest {
  name = 'SetFullSizeCardBattleWindowBaseTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = CardBattleWindowBase.createWindowFullSize(x, y);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.show();
    this.test('Deve abrir na largura total!', () => {
      this.subject.open();
    }, () => {
      this.assertTrue('Esta na largura total?', this.subject.isFullsize());
    });
  }

}