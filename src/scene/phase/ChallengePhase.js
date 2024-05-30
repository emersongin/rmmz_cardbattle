class ChallengePhase extends Phase {
  _titleWindow;
  _descriptionWindow;
  _folderWindow;

  createTitleWindow(text) {
    const title = TextWindow.setTextColor(text, GameColors.ORANGE);
    this._titleWindow = TextWindow.createWindowFullSize(0, 0, [title]);
    this._titleWindow.alignCenterAboveMiddle();
    this._titleWindow.alignTextCenter();
    this.attachChild(this._titleWindow);
  }

  createDescriptionWindow(textLvl, description) {
    const content = [textLvl, description];
    this._descriptionWindow = TextWindow.createWindowFullSize(0, 0, content);
    this._descriptionWindow.alignCenterMiddle();
    this.attachChild(this._descriptionWindow);
  }

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

  openTextWindows() {
    this.addActions([
      this.commandOpenTitleWindow,
      this.commandOpenDescriptionWindow,
    ]);
  }

  commandOpenTitleWindow() {
    this._titleWindow.open();
  }

  commandOpenDescriptionWindow() {
    this._descriptionWindow.open();
  }

  closeTextWindows() {
    this.addActions([
      this.commandCloseTitleWindow,
      this.commandCloseDescriptionWindow,
    ]);
  }

  commandCloseTitleWindow() {
    this._titleWindow.close();
  } 

  commandCloseDescriptionWindow() {
    this._descriptionWindow.close();
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
    return this.getStep() === GameConst.END_SELECT_FOLDER;
  }

  isBusy() {
    return super.isBusy() || 
      this._titleWindow.isBusy() || 
      this._descriptionWindow.isBusy() || 
      this._folderWindow.isBusy();
  }
}