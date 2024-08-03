// include ./strategy/IncreaseEnergyStrategy.js

class ActivationStep extends Step {
  _powerConfig = undefined;
  _powerActivation = undefined;
  _powerStrategy = undefined;
  _cardsetSprite = undefined;;

  constructor(scene, phase, powerConfig, powerActivation = undefined, finish) {
    const phasesEnabled = [GameConst.LOAD_PHASE];
    if (!phasesEnabled.some(p => p === phase)) {
      throw new Error('Invalid phase for ActivationStep.');
    }
    super(scene, phase, finish);
    if (!powerConfig || !(powerConfig.cardIndex >= 0) || !powerConfig.player) {
      throw new Error('Invalid powerConfig for ActivationStep.');
    }
    this._powerConfig = powerConfig;
    this._powerActivation = powerActivation
  }

  start(manager) {
    this.createPlayerGameBoard(manager);
    this.createChallengedGameBoard(manager);
    this.createPowerFieldCardsetSprite(manager);
    this.openGameBoards();
    this.openPowerfield();
  }

  createPowerFieldCardsetSprite(manager) {
    const cards = manager.getCardsByPowerfield();
    super.createPowerFieldCardsetSprite(cards);
  }
  
  update(manager) {
    super.update();
    if (this.isBusy() || this.hasActions()) return false;
    if (this.updateStrategy(manager)) return;
    this.updateActivation(manager);
    this.updateConfig(manager);
  }

  updateStrategy(manager) {
    if ((typeof this._powerStrategy === 'object') && !this._powerActivation) {
      this._powerStrategy?.update(manager);
      return true;
    }
    return false;
  }

  updateActivation(manager) {
    console.log(this._powerActivation);
    if ((typeof this._powerActivation === 'object') && !this._powerStrategy) {
      const cardIndex = this.getCardIndex();
      const player = this.getPlayer();
      manager.moveCardToPowerField(cardIndex, player);
      const sprite = this.getSpriteByIndex(cardIndex);
      const number = manager.getPowerfieldLength();
      console.log(number);
      this.moveCardToPowerfield(sprite, number, player);
      this.addAction(this.commandFinish, manager);
      this.endActivation();
      console.log(this._powerActivation);
    }
  }

  getSpriteByIndex(index) {
    return this.getPowerfieldCardsetSprite().getSpriteByIndex(index);
  }

  moveCardToPowerfield(sprite, number, player) {
    this.addAction(this.commandMoveCardToPowerfield, sprite, number, player);
  }

  commandMoveCardToPowerfield(sprite, number, player) {
    const powerfield = this.getPowerfieldCardsetSprite();
    powerfield.moveAllCardsInlist(sprite);
    powerfield.flashCardsAnimate(sprite, 'white');
    powerfield.setNumberColor(number, (player === GameConst.PLAYER) ? GameColors.BLUE : GameColors.RED);
    powerfield.displayReverseOrdering();
    powerfield.closeCards(sprite);
    powerfield.openCards(sprite);
  }

  updateConfig(manager) {
    if (!this._powerActivation && !this._powerStrategy) {
      const config = this._powerConfig;
      const { cardIndex: index } = config;
      const card = this.getCard(manager, index);
      const cardNumber = card;
      const powerEffect = manager.getPowerEffect(cardNumber);
      this.setPowerStrategy(powerEffect);
    }
  }

  getCard(manager, index) {
    const player = this.getPlayer();
    const location = GameConst.HAND;
    const config = { player, location };
    const [card] = manager.getCards(config, index);
    return card;
  }

  getPlayer() {
    return this._powerConfig.player;
  }

  getCardIndex() {
    return this._powerConfig.cardIndex;
  }

  setPowerStrategy(powerEffect) {
    const { type } = powerEffect;
    switch (type) {
      case GameConst.INCRESASE_ENERGY:
        this._powerStrategy = new IncreaseEnergyStrategy(this, this.getPlayer());
        this._powerStrategy.start();
        break;
      default:
        this._powerStrategy = undefined;
        break;
    }
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
            this.changeStep(ActivationStep);
          },
          challengedPassedHandler: () => {
            manager.challengedPassed();
          },
          activePowerfieldHandler: () => {
            this.changeStep(RunPowerfieldStep);
          },
        };
        this.changeStep(TurnStep, handlers);
        break;
      default:
        break;
    }
    this.end();
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
    this._powerStrategy = undefined;
  }
}