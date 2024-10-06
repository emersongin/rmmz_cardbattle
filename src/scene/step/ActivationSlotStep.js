// include ./strategy/IncreaseEnergyStrategy.js

class ActivationSlotStep extends Step {
  _powerActivation = undefined;
  _powerActivationConfig = undefined;
  _powerActivationStrategy = undefined;
  _end = false;

  constructor(scene, phase, powerConfig, powerActivation = undefined) {
    const phasesEnabled = [GameConst.LOAD_PHASE];
    if (!phasesEnabled.some(p => p === phase)) {
      throw new Error('Invalid phase for ActivationSlotStep.');
    }
    super(scene, phase);
    if (!powerConfig || !(powerConfig.cardIndexes.length > 0) || !powerConfig.player) {
      throw new Error('Invalid powerConfig for ActivationSlotStep.');
    }
    this._powerActivationConfig = powerConfig;
    this._powerActivation = powerActivation
    // this._end = false;
  }

  start(manager) {
    this.createPlayerGameBoard(manager);
    this.createChallengedGameBoard(manager);
    this.createPowerFieldCardsetSprite(manager);
    this.openGameBoards();
    this.openPowerfield();
    this.showPowerfieldDisplayOrdering();
  }

  showPowerfieldDisplayOrdering() {
    this.addAction(this.showDisplayOrdering);
  }

  showDisplayOrdering() {
    const powerfield = this.getPowerfieldCardsetSprite();
    const indexes = powerfield.getIndexes();
    const removeLast = indexes.pop();
    powerfield.displayReverseOrdering(indexes);
  }

  createPowerFieldCardsetSprite(manager) {
    const cardsInPowerfield = manager.getCardsByPowerfield();
    const powerCard = this.getPowerCard(manager);
    const cards = [...cardsInPowerfield, powerCard];
    super.createPowerFieldCardsetSprite(cards);
  }

  getPowerCard(manager) {
    const cardIndex = this.getPowerCardIndex();
    const card = this.getCard(manager, cardIndex);
    return card;
  }

  getPowerCardIndex() {
    return this._powerActivationConfig.cardIndexes[0];
  }

  getCard(manager, index) {
    const player = this.getPlayer();
    const location = GameConst.HAND;
    const config = { player, location };
    const [card] = manager.getCards(config, index);
    return card;
  }

  getPlayer() {
    return this._powerActivationConfig.player;
  }
  
  update(manager) {
    super.update();
    if (this.isBusy() || this.hasActions()) return false;
    // if (this.updateStrategy(manager)) return;
    // this.updateActivation(manager);
    // this.updateConfig(manager);
  }

  updateStrategy(manager) {
    if (this.isActive() && this.hasStrategy() && !this.hasActivation()) {
      this._powerActivationStrategy?.update(manager);
      return true;
    }
    return false;
  }

  hasStrategy() {
    return (typeof this._powerActivationStrategy === 'object');
  }

  updateActivation(manager) {
    if (this.isActive() && this.hasActivation() && !this.hasStrategy()) {
      const cardIndex = this.getPowerCardIndex();
      const player = this.getPlayer();
      manager.moveCardToPowerField(cardIndex, player);
      const number = manager.getPowerfieldLength();
      const lastIndex = number - 1;
      const sprite = this.getSpriteByIndex(lastIndex);
      this.moveCardToPowerfield(sprite, number, player);
      this.addAction(this.commandFinish, manager);
      this.ending();
    }
  }

  hasActivation() {
    return (typeof this._powerActivation === 'object');
  }

  ending() {
    this._end = true;
  }

  getSpriteByIndex(index) {
    const powerfield = this.getPowerfieldCardsetSprite();
    return powerfield.getSpriteByIndex(index);
  }

  moveCardToPowerfield(sprite, number, player) {
    this.addAction(this.commandMoveCardToPowerfield, sprite, number, player);
  }

  commandMoveCardToPowerfield(sprite, number, player) {
    const powerfield = this.getPowerfieldCardsetSprite();
    powerfield.moveAllCardsInlist();
    powerfield.flashCardsAnimate(sprite, 'white');
    // powerfield.setNumberColor(number, (player === GameConst.PLAYER) ? GameColors.BLUE : GameColors.RED);
    // powerfield.displayReverseOrdering();
    powerfield.closeCards(sprite);
    powerfield.openCards(sprite);
  }

  updateConfig(manager) {
    if (this.isActive() && !this.hasActivation() && !this.hasStrategy()) {
      const card = this.getPowerCard(manager);
      const cardNumber = card.number;
      const powerEffect = manager.getPowerEffect(cardNumber);
      this.setPowerStrategy(powerEffect);
    }
  }

  isActive() {
    return !this._end;
  }



  setPowerStrategy(powerEffect) {
    const { type } = powerEffect;
    switch (type) {
      case GameConst.INCRESASE_ENERGY:
        this._powerActivationStrategy = new IncreaseEnergyStrategy(this, this.getPlayer());
        break;
      default:
        this._powerActivationStrategy = undefined;
        break;
    }
    if (this._powerActivationStrategy) this._powerActivationStrategy.start();
  }

  commandFinish(manager) {
    const phase = this.getPhase();
    switch (phase) {
      case GameConst.LOAD_PHASE:
        const handlers = {
          playerPlayHandler: () => {
            const handlers = {
              goBackHandler: () => {},
              selectHandler: () => {},
              moveCursorHandler: () => {},
            };
            const config = {
              location: GameConst.HAND,
              player: GameConst.PLAYER,
              blockBattleCards: true,
              blockPowerCardsInLoadPhase: true,
            };
            this.changeStep(ZoneStep, config, handlers);
          },
          playerPassedHandler: () => {
            manager.playerPassed();
          },
          challengedPlayHandler: () => {
            this.changeStep(ActivationSlotStep);
          },
          challengedPassedHandler: () => {
            manager.challengedPassed();
          },
          activePowerfieldHandler: () => {
            this.changeStep(PowerZoneStep);
          },
        };
        this.changeStep(TurnStep, handlers);
        break;
      default:
        break;
    }
  }

  isBusy() {
    const children = [];
    return super.isBusy() || children.some(obj => (obj?.isBusy ? obj.isBusy() : false));
  }

  setActivation(powerActivation) {
    this._powerActivation = powerActivation;
  }

  endActivation() {
    this._powerActivation = undefined;
  }

  endStrategy() {
    this._powerActivationStrategy = undefined;
  }
}