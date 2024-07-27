class FolderStepInChallengePhaseTest extends SceneTest {
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
    this.describe('Deve apresentar etapa de escolha de pasta na fase de desafio.');
    this.expectWasTrue('A janela de pastas foi apresentada?', this.step.isFolderWindowVisible);
    this.expectTrue('A descrição da janela de pastas foi apresentado como?', this.step.isTextFolderWindow('Choose a folder'));
    const folderIndex = this.manager.folderIndex;
    this.expectTrue('A pasta foi escolhida?', folderIndex > -1);
    this.expectTrue('A proxima Etapa é DisplayStep?', this.isStep(DisplayStep));
    this.expectTrue('A proxima Fase é StartPhase?', this.step.getPhase() === GameConst.START_PHASE);
  }
}