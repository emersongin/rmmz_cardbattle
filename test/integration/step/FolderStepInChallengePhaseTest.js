class FolderStepInChallengePhaseTest extends SceneTest {
  manager = CardBattleManager;
  step;
  folderIndex;

  create() {
    const phase = GameConst.CHALLENGE_PHASE;
    const finish = this.createHandler();
    const playerFolders = this.manager.getPlayerFolders();
    const selectMock = (folderIndex) => {
      this.folderIndex = folderIndex;
    };
    this.step = new FolderStep(this._scene, phase, playerFolders, selectMock, finish);
    this.addAssistedHidden(this.step);
  }

  start() {
    this._scene.setStep(this.step);
    this.step.start(this.manager);
    this.step.addAction(() => {
      const index = 0;
      this.step.selectFolderWindowOption(index);
    });
  }

  update() {
    this.step.update(this.manager);
  }
  
  asserts() {
    this.describe('Deve apresentar etapa de escolha de pasta na fase de desafio.');
    this.expectWasTrue('A janela de pastas foi apresentada?', this.step.isFoldersWindowVisible);
    this.expectTrue('A descrição da janela de pastas foi apresentado como?', this.step.isTextFoldersWindow('Choose a folder'));
    this.expectTrue('A pasta foi escolhida?', this.folderIndex !== undefined);
    this.expectTrue('A proxima Etapa é DisplayStep?', this.isStep(DisplayStep));
    this.expectTrue('A proxima Fase é START_PHASE?', this.step.getPhase() === GameConst.START_PHASE);
  }
}