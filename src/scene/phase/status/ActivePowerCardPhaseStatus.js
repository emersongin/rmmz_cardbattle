class ActivePowerCardPhaseStatus {
  _phase;

  constructor(phase, manager) {
    if (phase instanceof LoadPhase === false) {
      throw new Error("phase is not an instance of LoadPhase");
    }
    this._phase = phase;
    this.start(manager);
  }

  start(manager) {
    console.log('start status');
  }

  update(manager) {
    const that = this._phase;
    if (Input.isTriggered('cancel')) {
      that.closeGameBoards();
      that.leaveGameBoards();
      that.closePowerCard();
      that.leavePowerCard();
      that.commandPlayerHand(manager);
      that.stepWainting();
      that.changeStatus(WaitingPhaseStatus);
    }
  }
}