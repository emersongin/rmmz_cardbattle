class StartPhase {
  _manager;

  constructor(manager) {
    this._manager = manager;
    console.log('Start phase started');
  }

  update() {
    console.log('Start phase updated');
  }

}