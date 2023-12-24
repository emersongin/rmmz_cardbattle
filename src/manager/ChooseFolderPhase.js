class ChooseFolderPhase {
  _manager;

  constructor(manager) {
    this._manager = manager;
    this._manager.phaseChanged();
  }

  update() {
    // console.log('Draw phase updated');
  }

}