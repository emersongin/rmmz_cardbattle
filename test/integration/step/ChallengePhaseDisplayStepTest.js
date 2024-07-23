class ChallengePhaseDisplayStepTest extends SceneTest {
  manager = CardBattleManager;
  step;

  create() {
    const phase = GameConst.CHALLENGE_PHASE;
    const finish = this.createHandler();
    this.step = new DisplayStep(this._scene, phase, finish);
    this.addAssistedHidden(this.step);
  }

  start() {
    this._scene.setStep(this.step);
    this.step.start(this.manager);
  }

  update() {
    this.step.update(this.manager);
  }
  
  asserts() {
    this.describe('Deve apresentar etapa de apresentação de desafiado.');
    this.expectWasTrue('A janela de título foi apresentada?', this.step.isTitleWindowVisible);
    this.expectWasTrue('A janela de descrição de desafiado foi apresentada?', this.step.isDescriptionWindowVisible);
  }
}