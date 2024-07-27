class FolderStep extends Step {
  _foldersWindow = {};
  _selectHandler = null;

  constructor(scene, phase, selectHandler, finish) {
    const phasesEnabled = [GameConst.CHALLENGE_PHASE];
    if (!phasesEnabled.some(p => p === phase)) {
      throw new Error('Invalid phase for FolderStep.');
    }
    super(scene, phase, finish);
    if (typeof selectHandler !== 'function') {
      throw new Error('Invalid selectHandler for FolderStep.');
    }
    this._selectHandler = selectHandler;
  }

  start(manager) {
    const folders = this.createFolders(manager);
    this.createFolderWindow('Choose a folder', folders);
    this.openFolderWindow();
  }

  createFolders(manager) {
    const selectHandler = this.createSelectHandler();
    let folders = manager.getPlayerFolders();
    folders = folders.map(folder => {
      folder.handler = selectHandler;
      return folder;
    });
    return folders;
  }

  createSelectHandler() {
    return (folderIndex) => {
      this.commandCloseFolderWindow();
      this.leaveFolderWindow();
      this.addAction(this.finish);
      this._selectHandler(folderIndex);
    };
  }

  commandCloseFolderWindow() {
    this._foldersWindow.close();
  }

  leaveFolderWindow() {
    this.addAction(this.commandLeaveFolderWindow);
  }

  commandLeaveFolderWindow() {
    this.removeChild(this._foldersWindow);
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
  }

  commandCreateFolderWindow(folderWindow) {
    this._foldersWindow = folderWindow
    this.commandAddChild(folderWindow);
  }

  openFolderWindow() {
    this.addAction(this.commandOpenFolderWindow);
  }

  commandOpenFolderWindow() {
    this._foldersWindow.open();
  }

  finish() {
    const phase = this.getPhase();
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
      this._foldersWindow
    ];
    return super.isBusy() || children.some(obj => (obj?.isBusy ? obj.isBusy() : false));
  }

  isFoldersWindowVisible() {
    return this._foldersWindow.visible;
  }

  isTextFoldersWindow(text) {
    return this._foldersWindow.isTextWasDrawing('TEXT_0', text);
  }
}