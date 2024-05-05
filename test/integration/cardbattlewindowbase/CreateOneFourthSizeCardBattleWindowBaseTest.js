class CreateOneFourthSizeCardBattleWindowBaseTest extends SceneTest {
  name = 'CreateOneFourthSizeCardBattleWindowBaseTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = CardBattleWindowBase.createWindowOneFourthSize(x, y);
    this.addWindow(this.subject);
  }

  start() {
    this.test('Deve ter o tamanho de 1/4 da tela!', () => {
      this.subject.open();
    }, () => {
      this.assertTrue('Esta na largura de 1/4 da tela?', this.subject.isOneFourthSize());
    });
  }
  
}