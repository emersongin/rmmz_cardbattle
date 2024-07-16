class DrawStep extends Step {

  start(manager) {
    const phase = this.getPhase();
    this.createPlayerGameBoard(manager);
    this.createChallengeGameBoard(manager);
    this.openGameBoards();
    this.drawCardsToGame(manager);
    this.loadGameBoardsToGame(manager);
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

  loadGameBoardsToGame(manager) {
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
        [this.commandChallengeLoadEnergy, chanllengeCardIndex, challengeUpdatePoint],
      ]);
    });
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

  update(manager) {
    super.update();
    if (this.isBusy()) return false;
    if (Input.isTriggered('ok')) {
      const phase = this.getPhase();
      this.closeGameBoards();
      this.leaveGameBoards();
      this.addAction(this.finish, phase);
    }
  }

  finish(phase) {
    if (typeof this._finish === 'function') return this._finish();
    switch (phase) {
      case null:
        break;
      default:
        break;
    }
  }
}