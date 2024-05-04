class ChangeColorCardBattleWindowBaseTest extends SceneTest {
  name = 'ChangeColorCardBattleWindowBaseTest';

  create() {
    this.subject = CardBattleWindowBase.create(0, 0, Graphics.width, Graphics.height);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.setCenteredAlignment();
    this.subject.open();
    this.test('Deve mudar para cor azul a janela!', () => {
      this.subject.setBlueColor();
    }, () => {
      this.assertTrue('Esta na cor azul?', this.subject.isBlueColor());
    });
    this.test('Deve mudar para cor vermelha a janela!', () => {
      this.subject.setRedColor();
    }, () => {
      this.assertTrue('Esta na cor vermelha?', this.subject.isRedColor());
    });
    this.test('Deve mudar para cor vermelha a janela!', () => {
      this.subject.setDefaultColor();
    }, () => {
      this.assertTrue('Esta na cor default?', this.subject.isDefaultColor());
    });
  }
}