class CloseCardBattleWindowBaseTest extends SceneTest {
  create() {
    this.subject = CardBattleWindowBase.createWindowFullSize(0, 0);
    this.addWatched(this.subject);
    this.subject.alignCenterMiddle();
    this.subject.open();
    this.subject.close();
  }

  asserts() {
    this.describe('Deve fechar a janela!');
    this.assertTrue('Esta fechada?', this.subject.isClosed());
  }
}