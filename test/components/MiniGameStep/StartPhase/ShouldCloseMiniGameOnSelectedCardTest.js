class ShouldCloseMiniGameOnSelectedCardTest extends SceneTest {
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
    this.describe('Deve escolher um cartão e mudar para próxima etapa de apresentação da fase de saque.');
    this.expectTrue('Tem um resultado?', typeof CardBattleManager.isPlayerStartTurn() === 'boolean');
    this.expectTrue('A proxima etapa é DisplayStep?', this.isStep(DisplayStep));
    this.expectTrue('A proxima Fase é DRAW_PHASE?', this.step.getPhase() === GameConst.DRAW_PHASE);
  }
}