class DrawPhase extends Phase {
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
      [this.commandDrawChallengeCards, challengeCards, challengeCardsInDeck],
    ]);
  }
  
  commandDrawPlayerCards(cards, cardsInDeck) {
    this._player.battlefield.show();
    const screenWidth = ScreenHelper.getFullWidth();
    const sprites = this._player.battlefield.setCards(cards, screenWidth);
    this._player.battlefield.showCards(sprites);
    this._player.battlefield.setTurnToDownCards(sprites);
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
    this._player.battlefield.moveCardsInlist(sprites, 6, fieldUpdates);
    this._player.battlefield.flipTurnToUpCards(sprites);
  }

  commandDrawChallengeCards(cards, cardsInDeck) {
    this._challenge.battlefield.show();
    const screenWidth = ScreenHelper.getFullWidth();
    const sprites = this._challenge.battlefield.setCards(cards, screenWidth);
    this._challenge.battlefield.showCards(sprites);
    this._challenge.battlefield.setTurnToDownCards(sprites);
    const fieldUpdates = sprites.map((sprite, index) => {
      const count = index + 1;
      const countCardsInDeck = cardsInDeck - count;
      const updateDeckPoints = BoardWindow.createValueUpdate(GameConst.CARDS_IN_DECK, countCardsInDeck);
      const updateHandPoints = BoardWindow.createValueUpdate(GameConst.CARDS_IN_HAND, count);
      const manyUpdates = [
        updateDeckPoints,
        updateHandPoints
      ];
      const boardWindow = this.getChallengeBoardWindow();
      boardWindow.updateValues(manyUpdates);
    });
    this._challenge.battlefield.moveCardsInlist(sprites, 6, fieldUpdates);
  }

  updateGameBoards(playerUpdates, challengeUpdates) {
    const updates = playerUpdates.map((playerUpdate, index) => {
      const challengeUpdate = challengeUpdates[index] || false;
      return [playerUpdate, challengeUpdate];
    });
    updates.forEach(([playerUpdate, challengeUpdate]) => {
      const { cardIndex: playerCardIndex, updatePoint: playerUpdatePoint } = playerUpdate;
      const { cardIndex: chanllengeCardIndex, updatePoint: challengeUpdatePoint } = challengeUpdate;
      this.addActions([
        [this.commandPlayerLoadEnergy, playerCardIndex, playerUpdatePoint],
        [this.commandChallengeLoadEnergy, chanllengeCardIndex, challengeUpdatePoint],
      ]);
    });
  }

  commandPlayerLoadEnergy(cardIndex, updatePoint) {
    const sprites = this._player.battlefield.getSprites();
    const sprite = sprites[cardIndex];
    if (updatePoint) {
      const chainAction = () => {
        const boardWindow = this.getPlayerBoardWindow();
        boardWindow.updateValues(updatePoint);
      };
      this._player.battlefield.flashCardsAnimate(sprite, 'white', 6, 1, chainAction);
    }
  }

  commandChallengeLoadEnergy(cardIndex, updatePoint) {
    const sprites = this._challenge.battlefield.getSprites();
    const sprite = sprites[cardIndex];
    if (updatePoint) {
      const chainAction = () => {
        const boardWindow = this.getChallengeBoardWindow();
        boardWindow.updateValues(updatePoint);
      };
      this._challenge.battlefield.flashCardsAnimate(sprite, 'white', 6, 1, chainAction);
    }
  }

  start(manager) {
    const title = 'Draw Phase';
    const description = '6 cards will be drawn.';
    this.createTitleWindow(title);
    this.createDescriptionWindow(description);
    this.openTextWindows();
    this.setStep(GameConst.START_PHASE);
  }

  update(manager) {
    super.update();
    if (this.isBusy()) return false;
    this.updateStepStart(manager);
    this.updateStepEnd(manager);
  }

  updateStepStart(manager) {
    if (this.isCurrentStep(GameConst.START_PHASE) && Input.isTriggered('ok')) {
      this.commandCloseTextWindows();
      this.leaveTextWindows();
      this.createPlayerGameBoard(manager);
      this.createChallengeGameBoard(manager);
      this.openGameBoards();
      this.drawCardsToGame(manager);
      this.updateGameBoardsToGame(manager);
      this.setStep(GameConst.START_DRAW_CARDS);
    }
  }

  updateStepEnd(manager) {
    if (this.isCurrentStep(GameConst.START_DRAW_CARDS) && Input.isTriggered('ok')) {
      this.closeGameBoards();
      this.leaveGameBoards();
      this.addAction(manager.endPhase);
    }
  }

  createPlayerGameBoard(manager) {
    const energies = Object.values(manager.getPlayerEnergies());
    const cardsInDeck = manager.getPlayerDeckLength();
    const cardsInHand = manager.getPlayerHandLength();
    const cardsInTrash = manager.getPlayerTrashLength();
    const victories = manager.getPlayerVictories();
    const passed = manager.isPlayerPassed();
    const boardWindow = this.createPlayerBoardWindow(energies, cardsInDeck, cardsInHand, passed);
    const boardWindowHeight = boardWindow.height;
    const battleWindow = this.createPlayerBattleWindow(boardWindowHeight);
    const trashWindow = this.createPlayerTrashWindow(cardsInTrash);
    const scoreWindow = this.createPlayerScoreWindow(victories, boardWindowHeight);
    const battlefield = this.createPlayerBattlefield();
  }

  createChallengeGameBoard(manager) {
    const energies = Object.values(manager.getChallengeEnergies());
    const cardsInDeck = manager.getChallengeDeckLength();
    const cardsInHand = manager.getChallengeHandLength();
    const cardsInTrash = manager.getChallengeTrashLength();
    const victories = manager.getChallengeVictories();
    const passed = manager.isChallengePassed();
    const boardWindow = this.createChallengeBoardWindow(energies, cardsInDeck, cardsInHand, passed);
    const boardWindowHeight = boardWindow.height;
    const battleWindow = this.createChallengeBattleWindow(boardWindowHeight);
    const trashWindow = this.createChallengeTrashWindow(cardsInTrash);
    const scoreWindow = this.createChallengeScoreWindow(victories, boardWindowHeight);
    const battlefield = this.createChallengeBattlefield();
  }

  drawCardsToGame(manager) {
    const playerNumCardsInDeck = manager.getPlayerDeckLength();
    const playerCardsDrawed = manager.getPlayerDeck().splice(0, 6);
    manager.setPlayerHand(playerCardsDrawed);
    const playerData = {
      cards: playerCardsDrawed,
      cardsInDeck: playerNumCardsInDeck,
    };
    const challengeNumCardsInDeck = manager.getChallengeDeckLength();
    const challengeCardsDrawed = manager.getChallengeDeck().splice(0, 6);
    manager.setChallengeHand(challengeCardsDrawed);
    const challengeData = {
      cards: challengeCardsDrawed,
      cardsInDeck: challengeNumCardsInDeck,
    };
    this.drawCards(playerData, challengeData);
  }

  updateGameBoardsToGame(manager) {
    const playerCardsInHand = manager.getPlayerHand();
    const playerEnergiesClone = Object.assign({}, manager.getPlayerEnergies());
    const playerUpdates = this.createFieldUpdates(playerCardsInHand, playerEnergiesClone);
    const playerFieldUpdates = playerUpdates.fieldUpdates;
    manager.setPlayerEnergies(playerUpdates.energies);
    const challengeCardsInHand = manager.getChallengeHand();
    const challengeEnergiesClone = Object.assign({}, manager.getChallengeEnergies());
    const challengeUpdates = this.createFieldUpdates(challengeCardsInHand, challengeEnergiesClone);
    const challengeFieldUpdates = challengeUpdates.fieldUpdates;
    manager.setChallengeEnergies(challengeUpdates.energies);
    this.updateGameBoards(playerFieldUpdates, challengeFieldUpdates);
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
}
