class ShouldCloseWindowsWhenPressActionChallengePhaseTest extends SceneTest {
  step;

  create() {
    this.createHandler();
    this.step = new DisplayStep(this._scene, GameConst.CHALLENGE_PHASE);
    this.addAssistedHidden(this.step);
  }

  start() {
    const finish = this.getHandler();
    this.mockFunction(Input, 'isTriggered', () => true);
    this.spyFunction(this.step, 'commandFinish', () => {
      finish();
    });
    this.setStep(this.step);
    this.step.start();
  }

  update() {
    this.step.update();
  }
  
  asserts() {
    this.describe('Deve fecha as janelas ao realizar ação e definir a proxima etap de pasta.');
    this.expectTrue('A janela de título foi fechada?', this.step.isTitleWindowClosed());
    this.expectTrue('A janela de descrição foi fechada?', this.step.isDescriptionWindowClosed());
    this.expectTrue('A proxima Etapa é FolderStep?', this.isStep(FolderStep));
  }
}