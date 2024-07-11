class WaitingPhaseStatus  {
  _phase;

  constructor(phase) {
    if (phase instanceof LoadPhase === false) {
      throw new Error("phase is not an instance of LoadPhase");
    }
    this._phase = phase;
  }

  start() {
    // nothing
  }

  update() {
    // nothing to do
  }

  activePowerCard(cardIndexHand, manager, player) {
    this._phase.changeStatus(ActivePowerCardPhaseStatus, cardIndexHand, manager, player);
  }

  runPowerCard(manager, powerCard) {
    this._phase.changeStatus(RunPowerCardPhaseStatus, manager, powerCard);
  }

  waitStatus() {
    return false;
  }
}