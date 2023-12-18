class StartPhase {
  _manager;

  constructor(manager) {
    this._manager = manager;
  }

  start() {
    console.log('Phase started');
  }

  update() {
    console.log('Phase updated');
  }

}