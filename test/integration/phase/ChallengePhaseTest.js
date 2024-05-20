class ChallengePhaseTest extends SceneTest {
  endTest;
  phase;

  create() {
    this.endTest = this.createHandler();
    this.scene.changePhase(ChallengePhase);
    this.phase = this.scene.getPhase();
    const title = 'Challenge Phase';
    this.phase.createTitleWindow(title);
    const line1 = 'lv. 85';
    const line2 = 'Amaterasu Duel King';
    const text = [line1, line2];
    this.phase.createDescriptionWindow(text);
    const folders = [
      {
        name: 'Folder 1',
        energies: [10, 10, 5, 5, 5, 5],
        handler: this.createHandler()
      }, {
        name: 'Folder 2',
        energies: [10, 10, 10, 10, 10, 10],
        handler: this.createHandler()
      }, {
        name: 'Folder 3',
        energies: [10, 10, 10, 0, 0, 0],
        handler: this.createHandler()
    }];
    this.phase.createFolderWindow(folders);
    this.phase.addActions([
      this.phase.commandOpenTitleWindow,
      this.phase.commandOpenDescriptionWindow,
    ]);
    this.phase.changeStepChallengePhase();

    this.addHiddenWatched(this.phase._titleWindow);
    this.addHiddenWatched(this.phase._descriptionWindow);
    this.addHiddenWatched(this.phase._folderWindow);
  }

  update() {
    if (this.phase.isBusy()) return;
    if (this.phase.isStepChallengePhase()) {
      this.phase.addActions([
        this.phase.commandCloseTitleWindow,
        this.phase.commandCloseDescriptionWindow,
      ]);
      this.phase.setWait();
      this.phase.openFolderWindow();
      this.phase.changeStepSelectFolder();
    } 
    if (this.phase.isStepSelectFolder()) {
      this.endTest();
    }
  }

  asserts() {
    this.describe('Challenge Phase');
    this.assertWasTrue('Title Window', this.phase._titleWindow.isOpen, this.phase._titleWindow);
    this.assertWasTrue('Description Window', this.phase._titleWindow.isOpen, this.phase._descriptionWindow);
    this.assertWasTrue('Folder Window', this.phase._titleWindow.isOpen, this.phase._folderWindow);
  }
}