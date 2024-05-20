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
  }

  update() {
    if (this.phase.isBusy()) return;
    if (this.phase.isStepChallengePhase() && Input.isTriggered('ok')) {
      this.phase.addActions([
        this.phase.commandCloseTitleWindow,
        this.phase.commandCloseDescriptionWindow,
      ]);
      this.phase.setWait();
      this.phase.openFolderWindow();
      this.phase.changeStepSelectFolder();
    } 
    if (this.phase.isStepSelectFolder()) {
      console.log('select folder');
    }
  }

  asserts() {
    this.describe('Challenge Phase');
  }
}