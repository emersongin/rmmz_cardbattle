class RunPowerCardPhaseStatus {
  _phase;
  _powerCard;

  constructor(phase, manager, powerCard) {
    if (phase instanceof LoadPhase === false) {
      throw new Error("phase is not an instance of LoadPhase");
    }
    // if (powerCard instanceof PowerCard === false) {
    //   throw new Error("powerCard is not an instance of PowerCard");
    // }
    this._phase = phase;
    this._powerCard = powerCard;
    this.start(manager);
  }

  start(manager) {
    console.log('RunPowerCardPhaseStatus start', this._powerCard);
  }

  isBusy() {
    return false;
  }

  update(manager) {
    const that = this._phase;
    // that.closeGameBoards();
    // that.leaveGameBoards();
    // that.closePowerCard();
    // that.leavePowerCard();
    // that.commandPlayerHand(manager);
    console.log('getPowerfieldLength', manager.getPowerfieldLength());
    if (manager.getPowerfieldLength() === 0) {
      manager.resetPlayes();
      that.setStep(GameConst.TURN_PHASE);
    }
    that.waitStatus();
    that.stepWainting();
  }

  activePowerCard(cardIndexHand, manager, player) {
    return false;
  }

  runPowerCard(manager, powerCard) {
    return false;
  }

  waitStatus() {
    this._phase.changeStatus(WaitingPhaseStatus);
  }
}