class ChallengePhaseTest extends SceneTest {
  phase;
  selectFolderIndex = -1;

  create() {
    this.phase = new ChallengePhase(this.scene);
    const title = TextWindow.setTextColor('Challenge Phase', GameColors.ORANGE);
    const text = [title];
    this.phase.createTitleWindow(text);
    const line = 'lv. 85';
    const line2 = 'Amaterasu Duel King';
    const text2 = [line, line2];
    this.phase.createDescriptionWindow(text2);
    const endTest = this.createHandler();
    const folders = [
      {
        name: 'Folder 1',
        energies: [10, 10, 5, 5, 5, 5],
        handler: () => {
          this.phase.closeFolderWindow();
          this.selectFolderIndex = 0;
          endTest();
        }
      }, {
        name: 'Folder 2',
        energies: [10, 10, 10, 10, 10, 10],
        handler: () => {
          this.phase.closeFolderWindow();
          this.selectFolderIndex = 1;
          endTest();
        }
      }, {
        name: 'Folder 3',
        energies: [10, 10, 10, 0, 0, 0],
        handler: () => {
          this.phase.closeFolderWindow();
          this.selectFolderIndex = 2;
          endTest();
        }
    }];
    const title2 = CommandWindow.setTextColor('Choose a folder', GameColors.ORANGE);
    const text3 = [title2];
    this.phase.createFolderWindow(text3, folders);
    this.addWatched(this.phase._titleWindow);
    this.addWatched(this.phase._descriptionWindow);
    this.addWatched(this.phase._folderWindow);
  }

  start() {
    this.scene.setPhase(this.phase);
    this.phase.addActions([
      this.phase.commandOpenTitleWindow,
      this.phase.commandOpenDescriptionWindow,
    ]);
    this.phase.stepChallengePhase();
  }
  
  update() {
    if (this.phase.isBusy()) return false;
    if (this.phase.isStepChallengePhase() && Input.isTriggered('ok')) {
      this.phase.stepSelectFolder();
      this.phase.addActions([
        this.phase.commandCloseTitleWindow,
        this.phase.commandCloseDescriptionWindow,
      ]);
      this.phase.addWait();
      this.phase.openFolderWindow();
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