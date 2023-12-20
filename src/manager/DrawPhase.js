class DrawPhase {
  _manager;

  constructor(manager) {
    this._manager = manager;
    console.log('Draw phase started');
  }

  update() {
    console.log('Draw phase updated');
  }

}