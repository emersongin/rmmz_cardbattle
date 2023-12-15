class StartPhase {
  _manager;

  constructor(manager) {
    this._manager = manager;
  }

  updateStart() {
    // this._manager.changePhase(new DrawPhase(this._manager));
    console.log('StartPhase');
  }

}