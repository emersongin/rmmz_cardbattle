class ChallengePhaseTest extends SceneTest {
  phase;
  manager = { 
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
    index: -1,
    getChallengeDescription: () => 'lv. 85 - Amaterasu Duel King',
    getPlayerFolders: () => this.manager.folders,
    setPlayerFolderIndex: (index) => this.manager.index = index,
    endPhase: () => {}
  };

  create() {
    this.phase = new ChallengePhase(this._scene);
    this.manager.endPhase = this.createHandler();
    this.addAssistedHidden(this.phase);
  }

  start() {
    this._scene.setPhase(this.phase);
    this.phase.start(this.manager);
  }

  update() {
    this.phase.update(this.manager);
  }
  
  asserts() {
    this.describe('Deve apresentar etapas de fase de desafiado e seleção de pasta.');
    this.expectWasTrue('A janela de título foi apresentada?', this.phase.isTitleWindowVisible);
    this.expectWasTrue('A janela de descrição de desafiado foi apresentada?', this.phase.isDescriptionWindowVisible);
    this.expectWasTrue('A Janela de escolha de pastas foi apresentada?', this.phase.isFolderWindowVisible);
    this.expectTrue('Foi escolhido uma pasta válida?', this.manager.index !== -1);
  }
}