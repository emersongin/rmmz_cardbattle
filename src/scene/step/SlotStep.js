// include ./strategy/IncreaseEnergyStrategy.js

class SlotStep extends Step {
  _powerConfig = undefined;
  _status = undefined;
  _slotCardsetSprite = undefined;

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
    this.none();
  }

  none() {
    this._status = undefined;
  }

  start() {
    this.createGameBoards();
    this.createSlotCardset();
    this.openGameBoards();
    this.openSlotCardset();
    // this.showPowerfieldDisplayOrdering();
  }

  createSlotCardset() {
    const contentWidth = CardsetSprite.contentOriginalWidth();
    const cardSpriteWidth = CardSprite.contentOriginalWidth();
    const x = ScreenHelper.getCenterPosition(contentWidth) + contentWidth - cardSpriteWidth;
    const y = ScreenHelper.getMiddlePosition(CardsetSprite.contentOriginalHeight());
    const cardsetSprite = CardsetSprite.create(x, y);
    cardsetSprite.show();
    const powerCard = this.getPowerCard();
    const sprites = cardsetSprite.listCards([powerCard]);
    cardsetSprite.startClosedCards(sprites);
    this.addAction(this.commandCreateSlotCardset, cardsetSprite);
    return cardsetSprite;
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

  commandCreateSlotCardset(cardsetSprite) {
    this._slotCardsetSprite = cardsetSprite;
    this.commandAddChild(cardsetSprite);
  }

  openSlotCardset() {
    this.addAction(this.commandOpenSlotCardset);
  }

  commandOpenSlotCardset() {
    this._slotCardsetSprite.openAllCards();
  }

  // showPowerfieldDisplayOrdering() {
  //   this.addAction(this.showDisplayOrdering);
  // }
  
  // showDisplayOrdering() {
  //   const powerfield = this.getPowerfieldCardsetSprite();
  //   const indexes = powerfield.getIndexes();
  //   const removeLast = indexes.pop();
  //   powerfield.displayReverseOrdering(indexes);
  // }

  update() {
    super.update();
    if (this.isBusy() || this.hasActions()) return;
    if (this.updateStrategyStart()) return;
    if (this.updateStrategyDuring()) return;
    if (this.updateStrategyFinish()) return;
  }

  isBusy() {
    const children = [
      this._slotCardsetSprite,
    ];
    return super.isBusy() || children.some(obj => (obj?.isBusy ? obj.isBusy() : false) ||
      (obj?.hasActions ? obj.hasActions() : false));
  }

  updateStrategyStart() {
    if (this._status) return;
    // aqui é onde a estratégia é selecionada e iniciada
  }

  startStrategy() {
    this._status = GameConst.START;
  }

  updateStrategyDuring() {
    if (!this._status || this._status === GameConst.FINISH) return;
    // aqui é onde a estratégia é executada e finalizada
  }

  finishStrategy() {
    this._status = GameConst.FINISH;
  }

  updateStrategyFinish() {
    if (!this._status || this._status !== GameConst.FINISH) return;
    this.moveCardToPowerField();
    this.addAction(this.commandFinish);
  }

  moveCardToPowerField() {
    let x = -600;
    const y = 0;
    const numberCardsInPowerfield = CardBattleManager.getPowerfieldLength();
    this.addAction(this.commandMoveCardToPowerfield, x, y);
  }

  commandMoveCardToPowerfield(x, y) {
    // const positions = CardsetSprite.createPositions(1, 0, x, y);
    const sprites = this._slotCardsetSprite.getSprites();
    this._slotCardsetSprite.moveAllCardsToPosition(sprites, x, y);
  }

  isSlotCardsetSpriteVisible() {
    return this._slotCardsetSprite.isVisible();
  }

  isSlotCardsetSpriteOpen() {
    return this._slotCardsetSprite.allCardsAreOpen();
  }

  isSlotCardsetSpriteX(x) {
    return this._slotCardsetSprite.x === x;
  }

  isSlotCardsetSpriteY(y) {
    return this._slotCardsetSprite.y === y;
  }











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
}