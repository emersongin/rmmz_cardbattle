// include ./strategy/IncreaseEnergyStrategy.js

class ActivationStep extends Step {
  _powerConfig = undefined;
  _powerActivation = undefined;
  _powerStrategy = undefined;
  _cardsetSprite = undefined;;

  constructor(scene, phase, powerConfig, powerActivation, finish) {
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
    if (typeof this._powerStrategy === 'object') {
      this._powerStrategy?.update(manager);
      return true;
    }
    return false;
  }

  updateActivation(manager) {
    if (typeof this._powerActivation === 'object') {
      this.addAction(this.commandFinish);
    }
  }

  updateConfig(manager) {
    const config = this._powerConfig;
    const { cardIndex: index } = config;
    const card = this.getCard(manager, index);
    const cardNumber = card;
    const powerEffect = manager.getPowerEffect(cardNumber);
    this.setPowerStrategy(powerEffect);
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

  setPowerStrategy(powerEffect) {
    const { type } = powerEffect;
    switch (type) {
      case GameConst.INCRESASE_ENERGY:
        this._powerStrategy = new IncreaseEnergyStrategy(this.scene, this.getPlayer());
        break;
      default:
        this._powerStrategy = null;
        break;
    }
  }

  commandFinish(phase) {
    switch (phase) {
      case null:
        break;
      default:
        break;
    }
    this.end();
  }

  isBusy() {
    const children = [
      this._cardsetSprite,
    ];
    return super.isBusy() || children.some(obj => (obj?.isBusy ? obj.isBusy() : false));
  }
}