class ChallengePhaseTest extends SceneTest {
  phase;
  selectFolderIndex = -1;

  create() {
    this.scene.changePhase(ChallengePhase);
    this.phase = this.scene.getPhase();
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
    this.phase.addActions([
      this.phase.commandOpenTitleWindow,
      this.phase.commandOpenDescriptionWindow,
    ]);
    this.addHiddenWatched(this.phase._titleWindow);
    this.addHiddenWatched(this.phase._descriptionWindow);
    this.addHiddenWatched(this.phase._folderWindow);
    this.phase.stepChallengePhase();
  }

  update() {
    if (this.phase.isBusy()) return;
    if (this.phase.isStepChallengePhase() && Input.isTriggered('ok')) {
      this.phase.stepSelectFolder();
      this.phase.addActions([
        this.phase.commandCloseTitleWindow,
        this.phase.commandCloseDescriptionWindow,
      ]);
      this.phase.setWait();
      this.phase.openFolderWindow();
    }
  }

  asserts() {
    this.describe('Deve apresentar etapas de fase de desafio e seleção de pasta.');
    this.assertWasTrue('A janela de título foi apresentada?', 'visible', this.phase._titleWindow);
    this.assertWasTrue('A janela de descrição de desafiado foi apresentada?', 'visible', this.phase._descriptionWindow);
    this.assertWasTrue('A Janela de escolah de pastas foi apresentada?', 'visible', this.phase._folderWindow);
    this.assertTrue('Foi escolhido uma pasta válida?', this.selectFolderIndex !== -1);
  }
}