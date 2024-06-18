class ChallengePhaseTest extends SceneTest {
  phase;
  endTest;
  selectFolderIndex = -1;

  create() {
    this.phase = new ChallengePhase(this.scene);
    this.phase.createTitleWindow('Challenge Phase');
    this.phase.createDescriptionWindow('lv. 85', 'Amaterasu Duel King');
    const selectHandler = (index) => {
      this.selectFolderIndex = index;
      this.phase.closeFolderWindow();
      this.phase.stepEndSelectFolder();
    };
    const folders = [
      {
        name: 'Folder 1',
        energies: [10, 10, 5, 5, 5, 5],
        handler: selectHandler, 
      }, {
        name: 'Folder 2',
        energies: [10, 10, 10, 10, 10, 10],
        handler: selectHandler, 
      }, {
        name: 'Folder 3',
        energies: [10, 10, 10, 0, 0, 0],
        handler: selectHandler, 
    }];
    this.phase.createFolderWindow('Choose a folder', folders);
    this.addHiddenWatched(this.phase.getTitleWindow());
    this.addHiddenWatched(this.phase.getDescriptionWindow());
    this.addHiddenWatched(this.phase.getFolderWindow());
    this.endTest = this.createHandler();
  }

  start() {
    this.scene.setPhase(this.phase);
    this.phase.addChildren();
    this.phase.openTextWindows();
    this.phase.stepStart();
  }
  
  update() {
    if (this.phase.isBusy()) return false;
    if (this.phase.isStepStart() && Input.isTriggered('ok')) {
      this.phase.closeTextWindows();
      this.phase.stepSelectFolder();
      this.phase.stepWainting();
      this.phase.openFolderWindow();
    }
    if (this.phase.isStepEndSelectFolder()) {
      this.phase.addAction(this.endTest);
    }
  }

  asserts() {
    this.describe('Deve apresentar etapas de fase de desafiado e seleção de pasta.');
    this.expectWasTrue('A janela de título foi apresentada?', 'visible', this.phase.getTitleWindow());
    this.expectWasTrue('A janela de descrição de desafiado foi apresentada?', 'visible', this.phase.getDescriptionWindow());
    this.expectWasTrue('A Janela de escolah de pastas foi apresentada?', 'visible', this.phase.getFolderWindow());
    this.expectTrue('Foi escolhido uma pasta válida?', this.selectFolderIndex !== -1);
  }
}