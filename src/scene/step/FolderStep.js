class FolderStep extends Step {
  _folderWindow = {};

  constructor(scene, phase, finish) {
    const phasesEnabled = [GameConst.CHALLENGE_PHASE];
    if (!phasesEnabled.some(p => p === phase)) {
      throw new Error('Invalid phase for FolderStep.');
    }
    super(scene, phase, finish);
  }

  start(manager) {
    const phase = this.getPhase();
    const selectHandler = (folderIndex) => {
      manager.setPlayerFolderIndex(folderIndex);
      this.commandCloseFolderWindow();
      this.leaveFolderWindow();
      this.addAction(this.finish, phase);
    };
    let folders = manager.getPlayerFolders();
    folders = folders.map(folder => {
      folder.handler = selectHandler;
      return folder;
    });
    const folderWindow = this.createFolderWindow('Choose a folder', folders);
    this.openFolderWindow();
  }

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

  openFolderWindow() {
    this.addAction(this.commandOpenFolderWindow);
  }

  commandOpenFolderWindow() {
    this._folderWindow.open();
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

  finish(phase) {
    switch (phase) {
      case GameConst.CHALLENGE_PHASE:
        this.changePhase(GameConst.START_PHASE);
        this.changeStep(DisplayStep);
        break;
      default:
        break;
    }
    if (typeof this._finish === 'function') return this._finish();
  }

  isBusy() {
    const children = [
      this._folderWindow
    ];
    return super.isBusy() || children.some(obj => (obj?.isBusy ? obj.isBusy() : false));
  }

  isFolderWindowVisible() {
    return this._folderWindow.visible;
  }

  isTextFolderWindow(text) {
    return this._folderWindow.isTextWasDrawing('TEXT_0', text);
  }
}