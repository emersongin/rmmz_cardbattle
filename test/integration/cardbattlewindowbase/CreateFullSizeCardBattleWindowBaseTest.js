class CreateFullSizeCardBattleWindowBaseTest extends SceneTest {
  name = 'CreateFullSizeCardBattleWindowBaseTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = CardBattleWindowBase.createWindowFullSize(x, y);
    this.addWatched(this.subject);
  }

  start() {
    this.test('Deve ter a largura total da tela!', () => {
      this.subject.open();
    }, () => {
      this.assertTrue('Esta na largura total da tela?', this.subject.isFullsize());
    });
  }

}