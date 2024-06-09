class ChallengePhase extends Phase {
  _folderWindow = {};

  createFolderWindow(text, folders) {
    const energies = folders.map(folder => FolderWindow.createEnergies(...folder.energies));
    const commands = folders.map((folder, index) => {
      return FolderWindow.createCommand(folder.name, `FOLDER_${index}`, folder.handler, energies[index])
    });
    const title = CommandWindow.setTextColor(text, GameColors.ORANGE);
    this._folderWindow = FolderWindow.create(0, 0, [title], commands);
    this._folderWindow.alignMiddle();
    this._folderWindow.alignTextCenter();
    this.attachChild(this._folderWindow);
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

  stepSelectFolder() {
    this.addAction(this.commandChangeStep, GameConst.START_SELECT_FOLDER);
  }

  stepEndSelectFolder() {
    this.addAction(this.commandChangeStep, GameConst.END_SELECT_FOLDER);
  }

  isStepEndSelectFolder() {
    return this.isCurrentStep(GameConst.END_SELECT_FOLDER);
  }

  isBusy() {
    const children = [
      this._folderWindow
    ];
    return super.isBusy() || children.some(obj => (obj.isBusy ? obj.isBusy() : false));
  }

  getFolderWindow() {
    return this._folderWindow;
  }
}