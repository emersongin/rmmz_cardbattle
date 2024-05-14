class OpenCardBattleWindowBaseTest extends SceneTest {
  create() {
    this.subject = CardBattleWindowBase.createWindowFullSize(0, 0);
    this.subject.alignCenterMiddle();
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve abrir a janela!');
    this.assertTrue('Esta aberta?', this.subject.isOpen());
  }
}