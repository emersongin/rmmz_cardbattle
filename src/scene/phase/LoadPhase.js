class LoadPhase extends Phase {
  _powerfield = {};

  start(manager) {
    this.changeStatus(WaitingPhaseStatus);

    // const title = 'Load Phase';
    // const description = 'Select and use a Program Card.';
    // this.createTitleWindow(title);
    // this.createDescriptionWindow(description);
    // this.openTextWindows();
    // this.setStep(GameConst.START_PHASE);
  }

  update(manager) {
    super.update();
    if (this.isBusy()) return false;
    this._status.update(manager);

    // super.update();
    // if (this.isBusy()) return false;
    // this.updateStepStart(manager);
    // this.updateStepBeginLoadPhase(manager);
    // this.updateStatus(manager);
    // this.updateStartPlay(manager);
    // this.updateStepChallengeLoadPhase(manager);
    // this.updateStepPlayerLoadPhase(manager);
    // this.updateStepPowerfieldLoadPhase(manager);
    // if (manager.isEndPlays() && manager.getPowerfieldLength()) return; 
    // this.updateStepEnd(manager);
  }

  createPowerfield(cards) {
    const x = ScreenHelper.getCenterPosition(CardsetSprite.contentOriginalWidth());
    const y = ScreenHelper.getMiddlePosition(CardsetSprite.contentOriginalHeight());
    const powerfield = CardsetSprite.create(x, y);
    powerfield.show();
    const xCard = CardsetSprite.contentOriginalWidth() - CardSprite.contentOriginalWidth();
    const sprites = powerfield.setCards(cards, xCard);
    powerfield.startClosedCards(sprites);
    this.addAction(this.commandCreatePowerfield, powerfield);
    return powerfield;
  }

  commandCreatePowerfield(powerfield) {
    this._powerfield = powerfield;
    this.commandAddChild(powerfield);
  }

  openPowerfield() {
    this.addAction(this.commandOpenPowerfield);
  }

  commandOpenPowerfield() {
    this._powerfield.openCards();
  }

  closePowerCard() {
    this.addAction(this.commandClosePowerCard);
  }

  commandClosePowerCard() {
    this._powerfield.closeCards();
  }

  leavePowerCard() {
    this.addAction(this.commandLeavePowerCard);
  }

  commandLeavePowerCard() {
    this.removeChild(this._powerfield);
  }

  moveCardToPowerfield(sprites, number, player) {
    this.addAction(this.commandMoveCardToPowerfield, sprites, number, player);
  }

  commandMoveCardToPowerfield(sprites, number, player) {
    this._powerfield.moveAllCardsInlist(sprites);
    this._powerfield.flashCardsAnimate(sprites, 'white');
    this._powerfield.setNumberColor(number, (player === GameConst.PLAYER_1) ? GameColors.BLUE : GameColors.RED);
    this._powerfield.displayReverseOrdering();
    this._powerfield.closeCards(sprites);
    this._powerfield.openCards(sprites);
  }

  commandGetPowerfieldSprites(index) {
    return this._powerfield.getSprites(index);
  }

  animateCastPowerCard(sprite, cardIndex) {
    // mostrar janela de titulo e descrição do card e espera
    this._powerfield.zoomAllCards(sprite);
    this._powerfield.flashCardsAnimate(sprite, 'white');
    this._powerfield.zoomOutAllCards(sprite);
    this._powerfield.leaveAllCards(sprite);
  }

  isBusy() {
    const children = [
      this._powerfield
    ];
    return super.isBusy() 
      || children.some(obj => (obj.isBusy ? obj.isBusy() : false)) 
      || (this._status ? this._status?.isBusy() : false);
  }

  waitStatus() {
    this.addAction(this.commandWaitStatus);
  }

  commandWaitStatus() {
    this._status.waitStatus();
  }

  activePowerCard(cardIndexHand, manager, player) {
    this.addAction(this.commandActivePowerCard, cardIndexHand, manager, player);
  }

  commandActivePowerCard(cardIndexHand, manager, player) {
    return this._status.activePowerCard(cardIndexHand, manager, player);
  }

  runPowerCard(manager, powerCard) {
    this.addAction(this.commandRunPowerCard, manager, powerCard);
  }

  commandRunPowerCard(manager, powerCard) {
    this._status.runPowerCard(manager, powerCard);
  }

  isPowerFieldVisible() {
    return this._powerfield.visible;
  }
}