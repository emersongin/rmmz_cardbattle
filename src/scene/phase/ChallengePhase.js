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

  isBusy() {
    const children = [
      this._folderWindow
    ];
    return super.isBusy() || children.some(obj => (obj.isBusy ? obj.isBusy() : false));
  }
}