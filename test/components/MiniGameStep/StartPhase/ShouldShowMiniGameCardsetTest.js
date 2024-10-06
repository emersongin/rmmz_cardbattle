class ShouldShowMiniGameCardsetTest extends SceneTest {
  step;

  create() {
    this.createHandler();
    this.step = new MiniGameStep(this._scene, GameConst.START_PHASE);
    this.addAssistedHidden(this.step);
  }

  start() {
    this._scene.setStep(this.step);
    this.step.start();
    this.mockFunction(Input, 'isTriggered', () => true);
    const finish = this.getHandler();
    this.spyFunction(this.step, 'commandFinish', () => {
      finish();
    });
  }

  update() {
    this.step.update();
  }
  
  asserts() {
    this.describe('Deve apresentar conjunto de cartões da etapa de mini game na fase de início.');
    this.expectWasTrue('O conjunto de cartões foi apresentado?', this.step.isCardsetVisible);
    this.expectWasTrue('O conjunto de cartões estava em modo de seleção?', this.step.isCardsetOnSelectMode);
  }
}