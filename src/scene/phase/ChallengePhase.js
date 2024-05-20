class ChallengePhase extends Phase {
  _titleWindow;
  _descriptionWindow;
  _folderWindow;

  createTitleWindow(title) {
    title = TextWindow.setTextColor(title, GameColors.ORANGE);
    this._titleWindow = TextWindow.createWindowFullSize(0, 0, [title]);
    this._titleWindow.alignCenterAboveMiddle();
    this._titleWindow.alignTextCenter();
    this.addWindow(this._titleWindow);
  }

  createDescriptionWindow(text) {
    this._descriptionWindow = TextWindow.createWindowFullSize(0, 0, text);
    this._descriptionWindow.alignCenterMiddle();
    this.addWindow(this._descriptionWindow);
  }

  createFolderWindow(folders) {
    const energies = folders.map(folder => FolderWindow.createEnergies(...folder.energies));
    const commands = folders.map((folder, index) => {
      return FolderWindow.createCommand(folder.name, `FOLDER_${index}`, folder.handler, energies[index])
    });
    let title = 'Choose a folder';
    title = CommandWindow.setTextColor(title, GameColors.ORANGE);
    const text = [title];
    this._folderWindow = FolderWindow.create(0, 0, text, commands);
    this._folderWindow.alignMiddle();
    this._folderWindow.alignTextCenter();
    this.addWindow(this._folderWindow);
  }

  openTitleWindow() {
    this.addAction(this.commandOpenTitleWindow);
  }

  commandOpenTitleWindow() {
    this._titleWindow.open();
    return true;
  }

  closeTitleWindow() {
    this.addAction(this.commandCloseTitleWindow);
  }

  commandCloseTitleWindow() {
    this._titleWindow.close();
    return true;
  } 

  openDescriptionWindow() {
    this.addAction(this.commandOpenDescriptionWindow);
  }

  commandOpenDescriptionWindow() {
    this._descriptionWindow.open();
    return true;
  }

  closeDescriptionWindow() {
    this.addAction(this.commandCloseDescriptionWindow);
  }

  commandCloseDescriptionWindow() {
    this._descriptionWindow.close();
    return true;
  }

  openFolderWindow() {
    this.addAction(this.commandOpenFolderWindow);
  }

  commandOpenFolderWindow() {
    this._folderWindow.open();
    return true;
  }

  closeFolderWindow() {
    this.addAction(this.commandCloseFolderWindow);
  }

  commandCloseFolderWindow() {
    this._folderWindow.close();
    return true;
  }

  changeStepChallengePhase() {
    this.changeStep('CHALLENGE_PHASE');
  }

  changeStepSelectFolder() {
    this.changeStep('SELECT_FOLDER');
  }

  isStepChallengePhase() {
    return this.getStep() === 'CHALLENGE_PHASE';
  }

  isStepSelectFolder() {
    return this.getStep() === 'SELECT_FOLDER';
  }

  isBusy() {
    return super.isBusy() || 
      this._titleWindow.isBusy() || 
      this._descriptionWindow.isBusy() || 
      this._folderWindow.isBusy();
  }

  isTextWindowOpen() {
    return this._titleWindow.isOpen.name;
  }
}