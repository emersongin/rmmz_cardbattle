class ShouldShowTextWindowLoadPhaseTest extends SceneTest {
  step;

  create() {
    this.createHandler();
    const handlers = {
      challengedPassedHandler: () => {},
      activePowerfieldHandler: () => {},
    };
    this.step = new TurnStep(this._scene, GameConst.LOAD_PHASE, handlers);
    this.addAssistedHidden(this.step);
  }

  start() {
    this.mockFunction(Input, 'isTriggered', () => true);
    const finish = this.getHandler();
    this.mockFunction(this.step, 'updateStartTurn', () => {
      finish();
    });
    this._scene.setStep(this.step);
    this.step.start();
  }

  update() {
    this.step.update();
  }
  
  asserts() {
    this.describe('Deve apresentar janela de texto na etapa de turno na fase de carregamento.');
    this.expectWasTrue('A janela de texto foi apresentada?', this.step.isTextWindowVisible);
    this.expectTrue('O texto da janela de texto é apresentado como: Begin Load Phase?', this.step.isTextWindowText('Begin Load Phase'));
  }
}