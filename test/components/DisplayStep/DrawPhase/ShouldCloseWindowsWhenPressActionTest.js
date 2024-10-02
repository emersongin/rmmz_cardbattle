class ShouldCloseWindowsWhenPressActionDrawPhaseTest extends SceneTest {
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
    this.mockFunction(Input, 'isTriggered', () => true);
    this.spyFunction(this.step, 'commandFinish', () => {
      finish();
    });
  }

  update() {
    this.step.update();
  }
  
  asserts() {
    this.describe('Deve fecha as janelas ao realizar ação e definir a proxima etap de saque.');
    this.expectTrue('A janela de título foi fechada?', this.step.isTitleWindowClosed());
    this.expectTrue('A janela de descrição foi fechada?', this.step.isDescriptionWindowClosed());
    this.expectTrue('A proxima Etapa é DrawStep?', this.isStep(DrawStep));
  }
}