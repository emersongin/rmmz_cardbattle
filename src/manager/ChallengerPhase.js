class ChallengerPhase {
  _manager;

  constructor(manager) {
    this._manager = manager;
  }

  update() {
    if (Input.isTriggered('ok')) {
      this._manager.changePhase(new StartPhase(this._manager));
    }
  }
}