class ShouldShowTitleWindowDrawPhaseTest extends SceneTest {
  step;

  create() {
    this.createHandler();
    this.step = new DisplayStep(this._scene, GameConst.DRAW_PHASE);
    this.addAssistedHidden(this.step);
  }

  start() {
    this.setStep(this.step);
    this.step.start();
    const finish = this.getHandler();
    this.mockFunction(Input, 'isTriggered', finish);
  }

  update() {
    this.step.update();
  }
  
  asserts() {
    this.describe('Deve apresentar janela de título em etapa de apresentação de fase de saque.');
    this.expectWasTrue('A janela de título foi apresentada?', this.step.isTitleWindowVisible);
    this.expectTrue('O título da fase foi apresentado como: Draw Phase?', this.step.isTitleWindowText('Draw Phase'));
  }
}