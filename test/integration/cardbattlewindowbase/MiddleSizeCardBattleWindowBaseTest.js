class MiddleSizeCardBattleWindowBaseTest extends SceneTest {
  name = 'MiddleSizeCardBattleWindowBaseTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = CardBattleWindowBase.createWindowMiddleSize(x, y);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.show();
    this.test('Deve ter o tamanho da metade da tela!', () => {
      this.subject.open();
    }, () => {
      this.assertTrue('Esta na largura metade da tela?', this.subject.isMiddleSize());
    });
  }
  
}