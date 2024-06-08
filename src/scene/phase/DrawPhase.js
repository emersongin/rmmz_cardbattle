class DrawPhase extends Phase {
  _playerBattleField = {};
  _challengeBattleField = {};

  createPlayerBattlefield() {
    const paddingLeft = this.getPaddingLeftBattleField();
    this._playerBattleField = CardsetSprite.create(paddingLeft, 0);
    const height = 120;
    const y = ScreenHelper.getBottomPosition(height);
    this._playerBattleField.alignAboveOf({ y, height });
    this.attachChild(this._playerBattleField);
  }

  getPaddingLeftBattleField() {
    const fieldWidth = ScreenHelper.getFieldWidth();
    const battlefieldWidth = CardsetSprite.contentOriginalWidth();
    const paddingLeft = (fieldWidth - battlefieldWidth) / 2;
    return paddingLeft;
  }

  createChallengeBattlefield() {
    const paddingLeft = this.getPaddingLeftBattleField();
    this._challengeBattleField = CardsetSprite.create(paddingLeft, 0);
    const height = 128;
    const y = ScreenHelper.getTopPosition();
    this._challengeBattleField.alignBelowOf({ y, height });
    this.attachChild(this._challengeBattleField);
  }

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
    this._playerBattleField.show();
    const screenWidth = ScreenHelper.getFullWidth();
    const sprites = this._playerBattleField.setCards(cards, screenWidth);
    this._playerBattleField.showCards(sprites);
    this._playerBattleField.setTurnToDownCards(sprites);
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
    this._playerBattleField.moveCardsInlist(sprites, 6, fieldUpdates);
    this._playerBattleField.flipTurnToUpCards(sprites);
  }

  commandDrawChallengeCards(cards, cardsInDeck) {
    this._challengeBattleField.show();
    const screenWidth = ScreenHelper.getFullWidth();
    const sprites = this._challengeBattleField.setCards(cards, screenWidth);
    this._challengeBattleField.showCards(sprites);
    this._challengeBattleField.setTurnToDownCards(sprites);
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
    this._challengeBattleField.moveCardsInlist(sprites, 6, fieldUpdates);
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
    const sprites = this._playerBattleField.getSprites();
    const sprite = sprites[cardIndex];
    if (updatePoint) {
      const chainAction = () => {
        const boardWindow = this.getPlayerBoardWindow();
        boardWindow.updateValues(updatePoint);
      };
      this._playerBattleField.flashCardsAnimate(sprite, 'white', 6, 1, chainAction);
    }
  }

  commandChallengeLoadEnergy(cardIndex, updatePoint) {
    const sprites = this._challengeBattleField.getSprites();
    const sprite = sprites[cardIndex];
    if (updatePoint) {
      const chainAction = () => {
        const boardWindow = this.getChallengeBoardWindow();
        boardWindow.updateValues(updatePoint);
      };
      this._challengeBattleField.flashCardsAnimate(sprite, 'white', 6, 1, chainAction);
    }
  }

  commandClosePlayerBattleField() {
    this._playerBattleField.closeCards();
  }

  commandCloseChallengeBattleField() {
    this._challengeBattleField.closeCards();
  }
}
