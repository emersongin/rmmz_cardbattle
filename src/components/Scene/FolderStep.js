class FolderStep extends Step {
  _folders = [];
  _foldersWindow = undefined;

  constructor(scene, phase) {
    const phasesEnabled = [GameConst.CHALLENGE_PHASE];
    if (!phasesEnabled.some(p => p === phase)) {
      throw new Error('Invalid phase for FolderStep.');
    }
    super(scene, phase);
    this.setFolder();
  }

  setFolder() {
    const playerFolders = CardBattleManager.getPlayerFolders();
    this._folders = playerFolders;
  }

  start(manager) {
    this.createFolders();
    const folderWindow = this.createFolderWindow('Choose a folder', this._folders);
    this.openFolderWindow();
    return folderWindow;
  }

  createFolders() {
    const selectHandler = this.createSelectHandler();
    this._folders = this._folders.map(folder => {
      folder.handler = selectHandler;
      return folder;
    });
  }

  createSelectHandler() {
    return (folderIndex) => {
      this.commandCloseFolderWindow();
      this.leaveFolderWindow();
      CardBattleManager.setPlayerFolderIndex(folderIndex);
      this.addAction(this.commandFinish);
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
    return folderWindow;
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

  commandFinish() {
    const phase = this.getPhase();
    switch (phase) {
      case GameConst.CHALLENGE_PHASE:
        this.changePhase(GameConst.START_PHASE);
        this.changeStep(DisplayStep);
        break;
      default:
        break;
    }
  }

  isBusy() {
    const children = [
      this._foldersWindow
    ];
    return super.isBusy() || children.some(obj => (obj?.isBusy ? obj.isBusy() : false) ||
      (obj?.hasActions ? obj.hasActions() : false));
  }

  isFoldersWindowVisible() {
    return this._foldersWindow?.visible;
  }

  isTextFoldersWindow(text) {
    return this._foldersWindow.isTextWasDrawn('TEXT_0', text);
  }

  selectFolderWindowOption(index, foldersWindow = this._foldersWindow) {
    foldersWindow.select(index);
    foldersWindow.callOkHandler();
  }

  isFolderWindowClosed() {
    return this._foldersWindow?.isClosed();
  }
}