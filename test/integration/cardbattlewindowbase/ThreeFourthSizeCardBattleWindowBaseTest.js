class ThreeFourthSizeCardBattleWindowBaseTest extends SceneTest {
  name = 'ThreeFourthSizeCardBattleWindowBaseTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = CardBattleWindowBase.createWindowThreeFourthSize(x, y);
    this.addWindow(this.subject);
  }

  start() {
    this.test('Deve ter o tamanho de 3/4 da tela!', () => {
      this.subject.open();
    }, () => {
      this.assertTrue('Esta na largura de 3/4 da tela?', this.subject.isThreeFourthSize());
    });
  }
  
}