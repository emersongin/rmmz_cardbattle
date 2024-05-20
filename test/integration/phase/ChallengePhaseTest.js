class ChallengePhaseTest extends SceneTest {
  phase;
  selectFolderIndex = -1;

  create() {
    this.scene.changePhase(ChallengePhase);
    this.phase = this.scene.getPhase();
    const title = 'Challenge Phase';
    this.phase.createTitleWindow(title);
    const line1 = 'lv. 85';
    const line2 = 'Amaterasu Duel King';
    const text = [line1, line2];
    this.phase.createDescriptionWindow(text);
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
    this.phase.createFolderWindow(folders);
    this.phase.addActions([
      this.phase.commandOpenTitleWindow,
      this.phase.commandOpenDescriptionWindow,
    ]);
    this.addHiddenWatched(this.phase._titleWindow);
    this.addHiddenWatched(this.phase._descriptionWindow);
    this.addHiddenWatched(this.phase._folderWindow);
    this.phase.changeStepChallengePhase();
  }

  update() {
    if (this.phase.isBusy()) return;
    if (this.phase.isStepChallengePhase() && Input.isTriggered('ok')) {
      this.phase.changeStepSelectFolder();
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