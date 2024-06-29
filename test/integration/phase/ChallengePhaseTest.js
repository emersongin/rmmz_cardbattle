class ChallengePhaseTest extends SceneTest {
  phase;
  endTest;
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
    this.scene._manager = this.manager;
    this.phase = new ChallengePhase(this.scene);
    this.manager.endPhase = this.createHandler();
    this.addHiddenWatched(this.phase);
  }

  start() {
    this.scene.setPhase(this.phase);
    this.phase.start(this.manager);
  }
  
  asserts() {
    console.log(this.phase.getTitleWindow());
    this.describe('Deve apresentar etapas de fase de desafiado e seleção de pasta.');
    this.expectWasTrue('A janela de título foi apresentada?', 'visible', this.phase.getTitleWindow());
    this.expectWasTrue('A janela de descrição de desafiado foi apresentada?', 'visible', this.phase.getDescriptionWindow());
    this.expectWasTrue('A Janela de escolah de pastas foi apresentada?', 'visible', this.phase.getFolderWindow());
    this.expectTrue('Foi escolhido uma pasta válida?', this.manager.index !== -1);
  }
}