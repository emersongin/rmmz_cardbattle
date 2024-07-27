class DrawStep extends Step {
  constructor(scene, phase, finish) {
    const phasesEnabled = [GameConst.DRAW_PHASE];
    if (!phasesEnabled.some(p => p === phase)) {
      throw new Error('Invalid phase for DrawStep.');
    }
    super(scene, phase, finish);
  }

  start(manager) {
    this.createPlayerGameBoard(manager);
    this.createChallengedGameBoard(manager);
    this.openGameBoards();
    this.drawCardsToGame(manager);
    this.loadGameBoardsToGame(manager);
  }

  drawCardsToGame(manager) {
    const playerNumCardsInDeck = manager.getPlayerDeckLength();
    const playerCardsDrawed = manager.drawPlayerCards(6);
    const playerData = {
      cards: playerCardsDrawed,
      cardsInDeck: playerNumCardsInDeck,
    };
    const challengeNumCardsInDeck = manager.getChallengedDeckLength();
    const challengeCardsDrawed = manager.drawChallengedCards(6);
    const challengeData = {
      cards: challengeCardsDrawed,
      cardsInDeck: challengeNumCardsInDeck,
    };
    this.drawCards(playerData, challengeData);
  }

  drawCards(player, challenge) {
    const { 
      cards: playerCards,
      cardsInDeck: playerCardsInDeck, 
    } = player;
    const { 
      cards: challengeCards,
      cardsInDeck: challengeCardsInDeck, 
    } = challenge;
    this.addActions([
      [this.commandDrawPlayerCards, playerCards, playerCardsInDeck],
      [this.commandDrawChallengedCards, challengeCards, challengeCardsInDeck],
    ]);
  }

  commandDrawPlayerCards(cards, cardsInDeck) {
    this.commandShowPlayerCardsetSprite();
    const screenWidth = ScreenHelper.getFullWidth();
    const sprites = this.commandSetCardsPlayerCardsetSprite(cards, screenWidth);
    this.commandShowCardsPlayerCardsetSprite(sprites);
    this.commandSetTurnToDownCardsPlayerCardsetSprite(sprites);
    const fieldUpdates = sprites.map((sprite, index) => {
      const count = index + 1;
      const countCardsInDeck = cardsInDeck - count;
      const updateDeckPoints = BoardWindow.createValueUpdate(GameConst.CARDS_IN_DECK, countCardsInDeck);
      const updateHandPoints = BoardWindow.createValueUpdate(GameConst.CARDS_IN_HAND, count);
      const manyUpdates = [
        updateDeckPoints,
        updateHandPoints
      ];
      const boardWindow = this.getPlayerBoardWindow();
      boardWindow.updateValues(manyUpdates);
    });
    this.commandMoveCardsInlistPlayerCardsetSprite(sprites, 6, fieldUpdates);
    this.commandFlipTurnToUpCardsPlayerCardsetSprite(sprites);
  }

  commandDrawChallengedCards(cards, cardsInDeck) {
    this.commandShowChallengedCardsetSprite();
    const screenWidth = ScreenHelper.getFullWidth();
    const sprites = this.commandSetCardsChallengedCardsetSprite(cards, screenWidth);
    this.commandShowCardsChallengedCardsetSprite(sprites);
    this.commandSetTurnToDownCardsChallengedCardsetSprite(sprites);
    const fieldUpdates = sprites.map((sprite, index) => {
      const count = index + 1;
      const countCardsInDeck = cardsInDeck - count;
      const updateDeckPoints = BoardWindow.createValueUpdate(GameConst.CARDS_IN_DECK, countCardsInDeck);
      const updateHandPoints = BoardWindow.createValueUpdate(GameConst.CARDS_IN_HAND, count);
      const manyUpdates = [
        updateDeckPoints,
        updateHandPoints
      ];
      const boardWindow = this.getChallengedBoardWindow();
      boardWindow.updateValues(manyUpdates);
    });
    const delay = 6;
    this.commandMoveCardsInlistChallengedCardsetSprite(sprites, delay, fieldUpdates);
  }

  loadGameBoardsToGame(manager) {
    const playerCardsInHand = manager.getPlayerHand();
    const playerEnergiesClone = Object.assign({}, manager.getPlayerEnergies());
    const playerUpdates = this.createFieldUpdates(playerCardsInHand, playerEnergiesClone);
    const playerFieldUpdates = playerUpdates.fieldUpdates;
    manager.setPlayerEnergies(playerUpdates.energies);
    const challengeCardsInHand = manager.getChallengedHand();
    const challengeEnergiesClone = Object.assign({}, manager.getChallengedEnergies());
    const challengeUpdates = this.createFieldUpdates(challengeCardsInHand, challengeEnergiesClone);
    const challengeFieldUpdates = challengeUpdates.fieldUpdates;
    manager.setChallengedEnergies(challengeUpdates.energies);
    this.loadGameBoards(playerFieldUpdates, challengeFieldUpdates);
  }

  createFieldUpdates(cards, energies) {
    const fieldUpdates = cards.map((card, cardIndex) => {
      const { color } = card;
      if (color === GameConst.BROWN) return false;
      energies[color] += 1;
      const points = energies[color];
      const updatePoint = BoardWindow.createValueUpdate(color, points);
      return { cardIndex, updatePoint };
    });
    return { fieldUpdates, energies };
  }

  loadGameBoards(playerUpdates, challengeUpdates) {
    const updates = playerUpdates.map((playerUpdate, index) => {
      const challengeUpdate = challengeUpdates[index] || false;
      return [playerUpdate, challengeUpdate];
    });
    updates.forEach(([playerUpdate, challengeUpdate]) => {
      const { cardIndex: playerCardIndex, updatePoint: playerUpdatePoint } = playerUpdate;
      const { cardIndex: chanllengeCardIndex, updatePoint: challengeUpdatePoint } = challengeUpdate;
      this.addActions([
        [this.commandPlayerLoadEnergy, playerCardIndex, playerUpdatePoint],
        [this.commandChallengedLoadEnergy, chanllengeCardIndex, challengeUpdatePoint],
      ]);
    });
  }

  commandChallengedLoadEnergy(cardIndex, updatePoint) {
    const sprites = this.commandGetSpritesChallengedCardsetSprite();
    const sprite = sprites[cardIndex];
    if (updatePoint) {
      const triggerAction = () => {
        const boardWindow = this.getChallengedBoardWindow();
        boardWindow.updateValues(updatePoint);
      };
      const color = 'white';
      const duration = 6;
      const times = 1; 
      this.commandFlashCardsAnimateChallengedCardsetSprite(sprite, color, duration, times, triggerAction);
    }
  }

  commandPlayerLoadEnergy(cardIndex, updatePoint) {
    const sprites = this.commandGetSpritesPlayerCardsetSprite();
    const sprite = sprites[cardIndex];
    if (updatePoint) {
      const chainAction = () => {
        const boardWindow = this.getPlayerBoardWindow();
        boardWindow.updateValues(updatePoint);
      };
      this.commandFlashCardsAnimatePlayerCardsetSprite(sprite, 'white', 6, 1, chainAction);
    }
  }

  update(manager) {
    super.update();
    if (this.isBusy() || this.hasActions()) return false;
    if (Input.isTriggered('ok')) {
      this.closeGameBoards();
      this.leaveGameBoards();
      this.addAction(this.finish);
    }
  }

  finish() {
    const phase = this.getPhase();
    switch (phase) {
      case GameConst.DRAW_PHASE:
        this.changePhase(GameConst.LOAD_PHASE);
        this.changeStep(DisplayStep);
        break;
      default:
        break;
    }
    if (typeof this._finish === 'function') return this._finish();
  }
}