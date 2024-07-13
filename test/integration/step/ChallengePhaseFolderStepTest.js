class ChallengePhaseFolderStepTest extends SceneTest {
  manager = {
    index: -1,
    folders: [
      {
        name: 'Folder 1',
        energies: [10, 10, 5, 5, 5, 5]
      }, {
        name: 'Folder 2',
        energies: [10, 10, 10, 10, 10, 10],
      }, {
        name: 'Folder 3',
        energies: [10, 10, 10, 0, 0, 0],
    }], 
    setPlayerFolderIndex: (index) => this.manager.index = index,
    getPlayerFolders: () => this.manager.folders,
  };
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