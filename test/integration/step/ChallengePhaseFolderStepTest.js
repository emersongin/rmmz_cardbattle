class ChallengePhaseFolderStepTest extends SceneTest {
  manager = CardBattleManager;
  step;

  create() {
    const phase = GameConst.CHALLENGE_PHASE;
    const finish = this.createHandler();
    this.step = new FolderStep(this._scene, phase, finish);
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
    this.describe('Deve apresentar etapa de pastas de desafiado.');
    this.expectWasTrue('A janela de pastas foi apresentada?', this.step.isFolderWindowVisible);
  }
}