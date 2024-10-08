class ShouldShowDescriptionWindowLoadPhaseTest extends SceneTest {
  step;

  create() {
    this.createHandler();
    this.step = new DisplayStep(this._scene, GameConst.LOAD_PHASE);
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
    this.describe('Deve apresentar janela de descrição em etapa de apresentação de fase de carregamento.');
    this.expectWasTrue('A janela de descrição foi apresentada?', this.step.isDescriptionWindowVisible);
    const texts = ['Select and use a Program Card.'];
    this.expectTrue('A descrição da fase foi apresentada como?', this.step.isDescriptionWindowText(texts));
  }
}