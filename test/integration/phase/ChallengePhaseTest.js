class ChallengePhaseTest extends SceneTest {
  phase;
  endTest;
  manager = { folders: [], index: -1 };

  create() {
    this.phase = new ChallengePhase(this.scene);
    this.endTest = this.createHandler();
    this.manager.folders = [
      {
        name: 'Folder 1',
        energies: [10, 10, 5, 5, 5, 5]
      }, {
        name: 'Folder 2',
        energies: [10, 10, 10, 10, 10, 10],
      }, {
        name: 'Folder 3',
        energies: [10, 10, 10, 0, 0, 0],
    }];
  }

  start() {
    this.scene.setPhase(this.phase);
    this.phase.createTitleWindow('Challenge Phase');
    this.phase.createDescriptionWindow('lv. 85', 'Amaterasu Duel King');
    this.addHiddenWatched(this.phase.getTitleWindow());
    this.addHiddenWatched(this.phase.getDescriptionWindow());
    this.phase.openTextWindows();
    this.phase.setStep(GameConst.START_PHASE);
  }
  
  update() {
    if (this.phase.isBusy()) return false;
    if (this.phase.isCurrentStep(GameConst.START_PHASE) && Input.isTriggered('ok')) {
      this.phase.commandCloseTextWindows();
      this.phase.leaveTextWindows();
      const selectHandler = (index) => {
        this.manager.index = index;
        this.phase.commandCloseFolderWindow();
        this.phase.leaveFolderWindow();
        this.phase.setStep(GameConst.END_SELECT_FOLDER);
      };
      let folders = this.manager.folders;
      folders = folders.map(folder => {
        folder.handler = selectHandler;
        return folder;
      });
      this.phase.createFolderWindow('Choose a folder', folders);
      this.addHiddenWatched(this.phase.getFolderWindow());
      this.phase.addWait();
      this.phase.openFolderWindow();
      this.phase.setStep(GameConst.START_SELECT_FOLDER);
    }
    if (this.phase.isCurrentStep(GameConst.END_SELECT_FOLDER)) {
      this.phase.addAction(this.endTest);
    }
  }

  asserts() {
    this.describe('Deve apresentar etapas de fase de desafiado e seleção de pasta.');
    this.expectWasTrue('A janela de título foi apresentada?', 'visible', this.phase.getTitleWindow());
    this.expectWasTrue('A janela de descrição de desafiado foi apresentada?', 'visible', this.phase.getDescriptionWindow());
    this.expectWasTrue('A Janela de escolah de pastas foi apresentada?', 'visible', this.phase.getFolderWindow());
    this.expectTrue('Foi escolhido uma pasta válida?', this.manager.index !== -1);
  }
}