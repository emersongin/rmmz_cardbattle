class ChallengePhaseTest extends SceneTest {
  phase;
  selectFolderIndex = -1;

  create() {
    this.phase = new ChallengePhase(this.scene);
    this.phase.createTitleWindow('Challenge Phase');
    this.phase.createDescriptionWindow('lv. 85', 'Amaterasu Duel King');
    const handler = (index) => {
      this.selectFolderIndex = index;
      this.phase.closeFolderWindow();
      this.phase.stepEndSelectFolder();
    };
    const folders = [
      {
        name: 'Folder 1',
        energies: [10, 10, 5, 5, 5, 5],
        handler, 
      }, {
        name: 'Folder 2',
        energies: [10, 10, 10, 10, 10, 10],
        handler, 
      }, {
        name: 'Folder 3',
        energies: [10, 10, 10, 0, 0, 0],
        handler, 
    }];
    this.phase.createFolderWindow('Choose a folder', folders);
    this.addHiddenWatched(this.phase._titleWindow);
    this.addHiddenWatched(this.phase._descriptionWindow);
    this.addHiddenWatched(this.phase._folderWindow);
    this.endTest = this.createHandler();
  }

  start() {
    this.scene.setPhase(this.phase);
    this.phase.addChildren();
    this.phase.addActions([
      this.phase.commandOpenTitleWindow,
      this.phase.commandOpenDescriptionWindow,
    ]);
    this.phase.stepStart();
  }
  
  update() {
    if (this.phase.isBusy()) return false;
    if (this.phase.isStepStart() && Input.isTriggered('ok')) {
      this.phase.addActions([
        this.phase.commandCloseTitleWindow,
        this.phase.commandCloseDescriptionWindow,
      ]);
      this.phase.stepSelectFolder();
      this.phase.openFolderWindow();
    }
    if (this.phase.isStepEndSelectFolder()) {
      this.phase.addAction(this.endTest);
    }
  }

  asserts() {
    this.describe('Deve apresentar etapas de fase de desafio e seleção de pasta.');
    this.expectWasTrue('A janela de título foi apresentada?', 'visible', this.phase._titleWindow);
    this.expectWasTrue('A janela de descrição de desafiado foi apresentada?', 'visible', this.phase._descriptionWindow);
    this.expectWasTrue('A Janela de escolah de pastas foi apresentada?', 'visible', this.phase._folderWindow);
    this.expectTrue('Foi escolhido uma pasta válida?', this.selectFolderIndex !== -1);
  }
}