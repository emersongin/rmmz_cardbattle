class ActivePowerCardPhaseStatus {
  _phase;
  _cardIndex;

  constructor(phase, cardIndexHand, manager) {
    if (phase instanceof LoadPhase === false) {
      throw new Error("phase is not an instance of LoadPhase");
    }
    // if (card instanceof PowerCard === false) {
    //   throw new Error("card is not an instance of PowerCard");
    // }
    this._phase = phase;
    this._cardIndex = cardIndexHand;
    this.start(cardIndexHand, manager);
  }

  start(cardIndex, manager) {
    const card = manager.getCardPlayerHandByIndex(cardIndex);
    const powerCardParams = manager.getPowerCardParams(card.id);
    this.setParams(powerCardParams);
  }

  setParams(params) {
    const { type } = params;
    switch (type) {
      case GameConst.ADD_ENERGIES:
        console.log('mostra animação de adicionar energias');
        break;
      default:
        break;
    }
  }

  update(manager) {
    const that = this._phase;
    const cardIndex = this._cardIndex;
    if (Input.isTriggered('ok')) {
      manager.moveCardHandToPowerField(cardIndex);
      const sprite = that.commandGetPowerfieldSprites(cardIndex);
      that.moveCardToPowerfield(sprite);
      that.runPowerCard(manager);
    }
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
    this._phase.changeStatus(RunPowerCardPhaseStatus, manager);
  }

  waitStatus() {
    this._phase.changeStatus(WaitingPhaseStatus);
  }
}