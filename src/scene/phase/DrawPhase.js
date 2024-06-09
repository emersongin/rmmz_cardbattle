class DrawPhase extends Phase {
  stepDrawCards() {
    this.addAction(this.commandChangeStep, GameConst.START_DRAW_CARDS);
  }

  isStepDrawCards() {
    return this.isCurrentStep(GameConst.START_DRAW_CARDS);
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
}
