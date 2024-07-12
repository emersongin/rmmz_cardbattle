class ActivePowerCardPhaseStatus {
  _phase;
  _cardIndex;
  _player;

  constructor(phase, cardIndexHand, manager, player) {
    if (phase instanceof LoadPhase === false) {
      throw new Error("phase is not an instance of LoadPhase");
    }
    // if (card instanceof PowerCard === false) {
    //   throw new Error("card is not an instance of PowerCard");
    // }
    this._phase = phase;
    this._cardIndex = cardIndexHand;
    this._player = player;
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

  isBusy() {
    return false;
  }

  update(manager) {
    const that = this._phase;
    const cardIndex = this._cardIndex;
    const player = this._player;
    if (Input.isTriggered('ok')) {
      manager.moveCardHandToPowerField(cardIndex, player);
      const sprite = that.commandGetPowerfieldSprites(cardIndex);
      const number = manager.getPowerfieldLength();
      that.moveCardToPowerfield(sprite, number, player);
      that.waitStatus();
      that.setStep(GameConst.CHALLENGE_TURN_PHASE);
      manager.resetPlayes();
      manager.playerPassed();
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