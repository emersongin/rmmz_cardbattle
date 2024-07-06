class RunPowerCardPhaseStatus {
  _phase;

  constructor(phase, manager) {
    if (phase instanceof LoadPhase === false) {
      throw new Error("phase is not an instance of LoadPhase");
    }
    // if (card instanceof PowerCard === false) {
    //   throw new Error("card is not an instance of PowerCard");
    // }
    this._phase = phase;
    this.start(manager);
  }

  start(manager) {

  }

  update(manager) {
    const that = this._phase;
    if (Input.isTriggered('cancel')) {
      that.closeGameBoards();
      that.leaveGameBoards();
      that.closePowerCard();
      that.leavePowerCard();
      that.commandPlayerHand(manager);
      that.waitStatus();
      that.stepWainting();
    }
  }

  activePowerCard(cardIndexHand, manager) {
    return false;
  }

  runPowerCard(manager) {
    return false;
  }

  waitStatus() {
    this._phase.changeStatus(WaitingPhaseStatus);
  }
}