class StartPhase {
  _manager;

  constructor(manager) {
    this._manager = manager;
    this._manager.phaseChanged();
  }

  update() {
    if (Input.isTriggered('ok')) {
      this._manager.changePhase(new DrawPhase(this._manager));
    }
  }

}