class ChallengePhaseFolderStepTest extends SceneTest {
  manager = CardBattleManager;
  step;

  create() {
    this.step = new FolderStep(this._scene, this.createHandler());
    this.addHiddenWatched(this.step);
  }

  start() {
    this._scene.setPhase(GameConst.CHALLENGE_PHASE);
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