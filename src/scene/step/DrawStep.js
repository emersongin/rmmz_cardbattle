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
    this.drawPlayersCardsAndMove(manager);
    this.loadPlayersGameBoards(manager);
  }

  drawPlayersCardsAndMove(manager) {
    const playerCardsDrawed = this.drawPlayerCards(manager);
    const challengedCardsDrawed = this.drawChallengedCards(manager);
    this.moveCardsToField(playerCardsDrawed, challengedCardsDrawed);
  }

  drawPlayerCards(manager) {
    const drawNumber = 6;
    const totalInDeck = manager.getPlayerDeckLength();
    const cardsDrawed = manager.drawPlayerCards(drawNumber);
    return { cardsDrawed, totalInDeck };
  }

  drawChallengedCards(manager) {
    const drawNumber = 6;
    const totalInDeck = manager.getChallengedDeckLength();
    const cardsDrawed = manager.drawChallengedCards(drawNumber);
    return { cardsDrawed, totalInDeck };
  }

  moveCardsToField(player, challenged) {
    const { 
      cardsDrawed: playerCardsDrawed,
      totalInDeck: totalInPlayerDeck, 
    } = player;
    const { 
      cardsDrawed: challengedCardsDrawed,
      totalInDeck: totalInChallengedDeck, 
    } = challenged;
    this.addActions([
      [this.commandDrawPlayerCards, playerCardsDrawed, totalInPlayerDeck],
      [this.commandDrawChallengedCards, challengedCardsDrawed, totalInChallengedDeck],
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

  loadPlayersGameBoards(manager) {
    const playerUpdates = this.loadPlayerGameBoard(manager);
    const challengedUpdates = this.loadChallengedGameBoard(manager);
    this.updateGameBoards(playerUpdates, challengedUpdates);
  }

  loadPlayerGameBoard(manager) {
    const cardsInHand = manager.getPlayerHandCards();
    const energiesClone = Object.assign({}, manager.getPlayerEnergies());
    const updates = this.createFieldUpdates(cardsInHand, energiesClone);
    const { fieldUpdates, energies } = updates;
    manager.setPlayerEnergies(energies);
    return fieldUpdates;
  }

  loadChallengedGameBoard(manager) {
    const cardsInHand = manager.getChallengedHandCards();
    const energiesClone = Object.assign({}, manager.getChallengedEnergies());
    const updates = this.createFieldUpdates(cardsInHand, energiesClone);
    const { fieldUpdates, energies } = updates;
    manager.setChallengedEnergies(energies);
    return fieldUpdates;
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

  updateGameBoards(playerUpdates, challengeUpdates) {
    const updates = this.mergeUpdates(playerUpdates, challengeUpdates);
    this.addUpdateActions(updates);
  }

  mergeUpdates(playerUpdates, challengeUpdates) {
    return playerUpdates.map((playerUpdate, index) => {
      const challengeUpdate = challengeUpdates[index] || false;
      return [playerUpdate, challengeUpdate];
    });
  }

  addUpdateActions(updates) {
    updates.forEach(([playerUpdate, challengeUpdate]) => {
      const { cardIndex: playerCardIndex, updatePoint: playerUpdatePoint } = playerUpdate;
      const { cardIndex: chanllengeCardIndex, updatePoint: challengeUpdatePoint } = challengeUpdate;
      this.addActions([
        [this.commandPlayerLoadEnergy, playerCardIndex, playerUpdatePoint],
        [this.commandChallengedLoadEnergy, chanllengeCardIndex, challengeUpdatePoint],
      ]);
    });
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
    this.end();
  }
}