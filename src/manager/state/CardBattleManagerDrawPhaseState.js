class CardBattleManagerDrawPhaseState {
  _manager;

  constructor(manager) {
    this._manager = manager;
    this._manager.phaseChanged();
  }

  update() {
    // TODO: Implement update
  }

}