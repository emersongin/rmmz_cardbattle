// include ./strategy/IncreaseEnergyStrategy.js

class SlotStep extends Step {
  _powerActivation = undefined;
  _powerConfig = undefined;
  _powerActivationStrategy = undefined;
  _isActive = false;

  constructor(scene, phase, powerConfig) {
    const phasesEnabled = [GameConst.LOAD_PHASE];
    if (!phasesEnabled.some(p => p === phase)) {
      throw new Error('Invalid phase for SlotStep.');
    }
    super(scene, phase);
    if (!powerConfig) {
      throw new Error('Power Config must be defined.');
    }
    if (!powerConfig.cardIndexes && powerConfig.cardIndexes.length === 0) {
      throw new Error('Power Config must have cardIndexes.');
    }
    if (!powerConfig.player) {
      throw new Error('Power Config must have player.');
    }
    this._powerConfig = powerConfig;
  }

  start() {
    this.createGameBoards();
    this.createPowerFieldCardsetSprite();
    this.openGameBoards();
    this.openPowerfield();
    this.showPowerfieldDisplayOrdering();
  }

  createPowerFieldCardsetSprite() {
    const cardsInPowerfield = CardBattleManager.getCardsByPowerfield();
    const powerCard = this.getPowerCard();
    const cards = [...cardsInPowerfield, powerCard];
    super.createPowerFieldCardsetSprite(cards);
  }

  getPowerCard() {
    const cardIndex = this.getPowerCardIndex();
    const card = this.getCard(cardIndex);
    return card;
  }

  getPowerCardIndex() {
    return this._powerConfig.cardIndexes[0];
  }

  getCard(index) {
    const player = this.getPlayer();
    const location = GameConst.HAND;
    const config = { player, location };
    const [card] = CardBattleManager.getCards(config, index);
    return card;
  }

  getPlayer() {
    return this._powerConfig.player;
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

  update() {
    super.update();
    if (this.isBusy() || this.hasActions()) return false;
    this.updateStrategy();
    // if (this.updateStrategy()) return;
    // this.updateActivation();
    // this.updateConfig();
  }

  updateStrategy() {
    // if (this.isActive() && this.hasStrategy() && !this.hasActivation()) {
    //   this._powerActivationStrategy?.update();
    //   return true;
    // }
    // return false;
  }

  isActive() {
    return this._isActive;
  }











 

  // hasStrategy() {
  //   return (typeof this._powerActivationStrategy === 'object');
  // }

  // updateActivation() {
  //   if (this.isActive() && this.hasActivation() && !this.hasStrategy()) {
  //     const cardIndex = this.getPowerCardIndex();
  //     const player = this.getPlayer();
  //     CardBattleManager.moveCardToPowerField(cardIndex, player);
  //     const number = CardBattleManager.getPowerfieldLength();
  //     const lastIndex = number - 1;
  //     const sprite = this.getSpriteByIndex(lastIndex);
  //     this.moveCardToPowerfield(sprite, number, player);
  //     this.addAction(this.commandFinish);
  //     this.ending();
  //   }
  // }

  // hasActivation() {
  //   return (typeof this._powerActivation === 'object');
  // }

  // ending() {
  //   this._end = true;
  // }

  // getSpriteByIndex(index) {
  //   const powerfield = this.getPowerfieldCardsetSprite();
  //   return powerfield.getSpriteByIndex(index);
  // }

  // moveCardToPowerfield(sprite, number, player) {
  //   this.addAction(this.commandMoveCardToPowerfield, sprite, number, player);
  // }

  // commandMoveCardToPowerfield(sprite, number, player) {
  //   const powerfield = this.getPowerfieldCardsetSprite();
  //   powerfield.moveAllCardsInlist();
  //   powerfield.flashCardsAnimate(sprite, 'white');
  //   // powerfield.setNumberColor(number, (player === GameConst.PLAYER) ? GameColors.BLUE : GameColors.RED);
  //   // powerfield.displayReverseOrdering();
  //   powerfield.closeCards(sprite);
  //   powerfield.openCards(sprite);
  // }

  // updateConfig() {
  //   if (this.isActive() && !this.hasActivation() && !this.hasStrategy()) {
  //     const card = this.getPowerCard();
  //     const cardNumber = card.number;
  //     const powerEffect = CardBattleManager.getPowerEffect(cardNumber);
  //     this.setPowerStrategy(powerEffect);
  //   }
  // }

 

  // setPowerStrategy(powerEffect) {
  //   const { type } = powerEffect;
  //   switch (type) {
  //     case GameConst.INCRESASE_ENERGY:
  //       this._powerActivationStrategy = new IncreaseEnergyStrategy(this, this.getPlayer());
  //       break;
  //     default:
  //       this._powerActivationStrategy = undefined;
  //       break;
  //   }
  //   if (this._powerActivationStrategy) this._powerActivationStrategy.start();
  // }

  // commandFinish() {
  //   const phase = this.getPhase();
  //   switch (phase) {
  //     case GameConst.LOAD_PHASE:
  //       const handlers = {
  //         playerPlayHandler: () => {
  //           const handlers = {
  //             goBackHandler: () => {},
  //             selectHandler: () => {},
  //             moveCursorHandler: () => {},
  //           };
  //           const config = {
  //             location: GameConst.HAND,
  //             player: GameConst.PLAYER,
  //             blockBattleCards: true,
  //             blockPowerCardsInLoadPhase: true,
  //           };
  //           this.changeStep(ZoneStep, config, handlers);
  //         },
  //         playerPassedHandler: () => {
  //           CardBattleManager.playerPassed();
  //         },
  //         challengedPlayHandler: () => {
  //           this.changeStep(SlotStep);
  //         },
  //         challengedPassedHandler: () => {
  //           CardBattleManager.challengedPassed();
  //         },
  //         activePowerfieldHandler: () => {
  //           this.changeStep(PowerZoneStep);
  //         },
  //       };
  //       this.changeStep(TurnStep, handlers);
  //       break;
  //     default:
  //       break;
  //   }
  // }

  // isBusy() {
  //   const children = [];
  //   return super.isBusy() || children.some(obj => (obj?.isBusy ? obj.isBusy() : false));
  // }

  // setActivation(powerActivation) {
  //   this._powerActivation = powerActivation;
  // }

  // endActivation() {
  //   this._powerActivation = undefined;
  // }

  // endStrategy() {
  //   this._powerActivationStrategy = undefined;
  // }
}