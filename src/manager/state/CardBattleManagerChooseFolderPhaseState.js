// include ./CardBattleManagerStartPhaseState.js

class CardBattleManagerChooseFolderPhaseState {
  _manager;

  constructor(manager) {
    this._manager = manager;
    this._manager.phaseChanged();
  }

  update() {
    if (this._manager.hasPlayerDeck()) {
      this._manager.changePhase(new CardBattleManagerStartPhaseState(this._manager));
    }
  }

}