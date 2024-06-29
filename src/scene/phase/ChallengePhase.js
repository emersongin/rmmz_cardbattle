class ChallengePhase extends Phase {
  _folderWindow = {};

  createFolderWindow(text, folders) {
    const energies = folders.map(folder => FolderWindow.createEnergies(...folder.energies));
    const commands = folders.map((folder, index) => {
      return FolderWindow.createCommand(folder.name, `FOLDER_${index}`, folder.handler, energies[index])
    });
    const title = CommandWindow.setTextColor(text, GameColors.ORANGE);
    const folderWindow = FolderWindow.create(0, 0, [title], commands);
    folderWindow.alignMiddle();
    folderWindow.alignTextCenter();
    this.addAction(this.commandCreateFolderWindow, folderWindow);
    return folderWindow;
  }

  commandCreateFolderWindow(folderWindow) {
    this._folderWindow = folderWindow
    this.commandAddChild(folderWindow);
  }

  getFolderWindow() {
    return this._folderWindow;
  }

  openFolderWindow() {
    this.addAction(this.commandOpenFolderWindow);
  }

  commandOpenFolderWindow() {
    this._folderWindow.open();
  }

  closeFolderWindow() {
    this.addAction(this.commandCloseFolderWindow);
  }

  commandCloseFolderWindow() {
    this._folderWindow.close();
  }

  leaveFolderWindow() {
    this.addAction(this.commandLeaveFolderWindow);
  }

  commandLeaveFolderWindow() {
    this.removeChild(this._folderWindow);
  }

  start(manager) {
    const title = 'Challenge Phase';
    const description = manager.getChallengeDescription();
    const titleWindow = this.createTitleWindow(title);
    const descriptionWindow = this.createDescriptionWindow(description);
    this.openTextWindows();
    this.setStep(GameConst.START_PHASE);
  }

  update(manager) {
    super.update();
    if (this.isBusy()) return false;
    this.updateStepStart(manager);
    this.updateStepEnd(manager);
  }

  updateStepStart(manager) {
    if (this.isCurrentStep(GameConst.START_PHASE) && Input.isTriggered('ok')) {
      this.commandCloseTextWindows();
      this.leaveTextWindows();
      const selectHandler = (folderIndex) => {
        manager.setPlayerFolderIndex(folderIndex);
        this.commandCloseFolderWindow();
        this.leaveFolderWindow();
        this.setStep(GameConst.END_SELECT_FOLDER);
      };
      let folders = manager.getPlayerFolders();
      folders = folders.map(folder => {
        folder.handler = selectHandler;
        return folder;
      });
      const folderWindow = this.createFolderWindow('Choose a folder', folders);
      this.addWait();
      this.openFolderWindow();
      this.setStep(GameConst.START_SELECT_FOLDER);
    }
  }

  updateStepEnd(manager) {
    if (this.isCurrentStep(GameConst.END_SELECT_FOLDER)) {
      this.addAction(manager.endPhase);
    }
  }

  isBusy() {
    const children = [
      this._folderWindow
    ];
    return super.isBusy() || children.some(obj => (obj.isBusy ? obj.isBusy() : false));
  }
}