class DrawPhase extends Phase {
  _playerBoardWindow = {};
  _playerBattleWindow = {};
  _playerTrashWindow = {};
  _playerScoreWindow = {};
  _playerBattleField = {};
  _challengeBoardWindow = {};
  _challengeBattleWindow = {};
  _challengeTrashWindow = {};
  _challengeScoreWindow = {};
  _challengeBattleField = {};

  createPlayerGameBoard(cardsInTrash, cardsInDeck, cardsInHand, energies, victories) {
    this.createPlayerBoardWindow(energies, cardsInDeck, cardsInHand);
    this.createPlayerBattleWindow();
    this.createPlayerTrashWindow(cardsInTrash);
    this.createPlayerScoreWindow(victories);
  }

  createPlayerBoardWindow(energies, cardsInDeck, cardsInHand) {
    this._playerBoardWindow = BoardWindow.create(0, 0);
    this._playerBoardWindow.changeBlueColor();
    this._playerBoardWindow.alignStartBottom();
    const points = [...energies, cardsInDeck, cardsInHand];
    this._playerBoardWindow.refreshPoints(...points);
    this.attachChild(this._playerBoardWindow);
  }

  createPlayerBattleWindow() {
    this._playerBattleWindow = BattlePointsWindow.create(0, 0);
    this._playerBattleWindow.changeBlueColor();
    this._playerBattleWindow.alignStartBottom();
    const height = this._playerBoardWindow.height;
    const y = ScreenHelper.getBottomPosition(height);
    this._playerBattleWindow.alignAboveOf({ y, height });
    this._playerBattleWindow.refresh();
    this.attachChild(this._playerBattleWindow);
  }

  createPlayerTrashWindow(cardsInTrash) {
    this._playerTrashWindow = TrashWindow.create(0, 0);
    this._playerTrashWindow.changeBlueColor();
    this._playerTrashWindow.alignEndBelowMiddle();
    this._playerTrashWindow.refreshPoints(cardsInTrash);
    this.attachChild(this._playerTrashWindow);
  }

  createPlayerScoreWindow(victories) {
    this._playerScoreWindow = ScoreWindow.create(0, 0);
    this._playerScoreWindow.changeBlueColor();
    this._playerScoreWindow.alignEndBottom();
    const height = this._playerBoardWindow.height;
    const y = ScreenHelper.getBottomPosition(height);
    this._playerScoreWindow.alignAboveOf({ y, height });
    this._playerScoreWindow.refreshScore(victories);
    this.attachChild(this._playerScoreWindow);
  }

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

  createChallengeGameBoard(cardsInTrash, cardsInDeck, cardsInHand, energies, victories) {
    this.createChallengeBoardWindow(energies, cardsInDeck, cardsInHand);
    this.createChallengeBattleWindow();
    this.createChallengeTrashWindow(cardsInTrash);
    this.createChallengeScoreWindow(victories);
  }

  createChallengeBoardWindow(energies, cardsInDeck, cardsInHand) {
    this._challengeBoardWindow = BoardWindow.create(0, 0);
    this._challengeBoardWindow.changeRedColor();
    this._challengeBoardWindow.alignStartTop();
    const points = [...energies, cardsInDeck, cardsInHand];
    this._challengeBoardWindow.refreshPoints(...points);
    this.attachChild(this._challengeBoardWindow);
  }

  createChallengeBattleWindow() {
    this._challengeBattleWindow = BattlePointsWindow.create(0, 0);
    this._challengeBattleWindow.changeRedColor();
    this._challengeBattleWindow.alignStartTop();
    const height = this._playerBoardWindow.height;
    const y = ScreenHelper.getTopPosition();
    this._challengeBattleWindow.alignBelowOf({ y, height });
    this._challengeBattleWindow.refresh();
    this.attachChild(this._challengeBattleWindow);
  }

  createChallengeTrashWindow(cardsInTrash) {
    this._challengeTrashWindow = TrashWindow.create(0, 0);
    this._challengeTrashWindow.changeRedColor();
    this._challengeTrashWindow.alignEndAboveMiddle();
    this._challengeTrashWindow.reverseIcons();
    this._challengeTrashWindow.refreshPoints(cardsInTrash);
    this.attachChild(this._challengeTrashWindow);
  }

  createChallengeScoreWindow(victories) {
    this._challengeScoreWindow = ScoreWindow.create(0, 0);
    this._challengeScoreWindow.changeRedColor();
    this._challengeScoreWindow.alignEndTop();
    const height = this._playerBoardWindow.height;
    const y = ScreenHelper.getTopPosition();
    this._challengeScoreWindow.alignBelowOf({ y, height });
    this._challengeScoreWindow.refreshScore(victories);
    this.attachChild(this._challengeScoreWindow);
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

  openGameBoards() {
    this.addActions([
      this.commandOpenPlayerBoardWindow,
      this.commandOpenPlayerBattleWindow,
      this.commandOpenPlayerTrashWindow,
      this.commandOpenPlayerScoreWindow,
      this.commandOpenChallengeBoardWindow,
      this.commandOpenChallengeBattleWindow,
      this.commandOpenChallengeTrashWindow,
      this.commandOpenChallengeScoreWindow,
    ]);
  }

  commandOpenPlayerBoardWindow() {
    this._playerBoardWindow.open();
  }

  commandOpenPlayerBattleWindow() {
    this._playerBattleWindow.open();
  }

  commandOpenPlayerTrashWindow() {
    this._playerTrashWindow.open();
  }

  commandOpenPlayerScoreWindow() {
    this._playerScoreWindow.open();
  }
  
  commandOpenChallengeBoardWindow() {
    this._challengeBoardWindow.open();
  }

  commandOpenChallengeBattleWindow() {
    this._challengeBattleWindow.open();
  }

  commandOpenChallengeTrashWindow() {
    this._challengeTrashWindow.open();
  }

  commandOpenChallengeScoreWindow() {
    this._challengeScoreWindow.open();
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
      this._playerBoardWindow.updateValues(manyUpdates);
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
      this._challengeBoardWindow.updateValues(manyUpdates);
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
        this._playerBoardWindow.updateValues(updatePoint);
      };
      this._playerBattleField.flashCardsAnimate(sprite, 'white', 6, 1, chainAction);
    }
  }

  commandChallengeLoadEnergy(cardIndex, updatePoint) {
    const sprites = this._challengeBattleField.getSprites();
    const sprite = sprites[cardIndex];
    if (updatePoint) {
      const chainAction = () => {
        this._challengeBoardWindow.updateValues(updatePoint);
      };
      this._challengeBattleField.flashCardsAnimate(sprite, 'white', 6, 1, chainAction);
    }
  }

  closeGameObjects() {
    this.addActions([
      this.commandClosePlayerBattleField,
      this.commandCloseChallengeBattleField,
      this.commandClosePlayerBoardWindow,
      this.commandClosePlayerBattleWindow,
      this.commandClosePlayerTrashWindow,
      this.commandClosePlayerScoreWindow,
      this.commandCloseChallengeBoardWindow,
      this.commandCloseChallengeBattleWindow,
      this.commandCloseChallengeTrashWindow,
      this.commandCloseChallengeScoreWindow,
    ]);
  }

  commandClosePlayerBattleField() {
    this._playerBattleField.closeCards();
  }

  commandCloseChallengeBattleField() {
    this._challengeBattleField.closeCards();
  }

  commandClosePlayerBoardWindow() {
    this._playerBoardWindow.close();
  }

  commandClosePlayerBattleWindow() {
    this._playerBattleWindow.close();
  }

  commandClosePlayerTrashWindow() {
    this._playerTrashWindow.close();
  }

  commandClosePlayerScoreWindow() {
    this._playerScoreWindow.close();
  }

  commandCloseChallengeBoardWindow() {
    this._challengeBoardWindow.close();
  }

  commandCloseChallengeBattleWindow() {
    this._challengeBattleWindow.close();
  }

  commandCloseChallengeTrashWindow() {
    this._challengeTrashWindow.close();
  }

  commandCloseChallengeScoreWindow() {
    this._challengeScoreWindow.close();
  }

  isBusy() {
    return super.isBusy() || 
      this._playerBoardWindow.isBusy() ||
      this._playerBattleWindow.isBusy() ||
      this._playerTrashWindow.isBusy() ||
      this._playerScoreWindow.isBusy() ||
      this._challengeBoardWindow.isBusy() ||
      this._challengeBattleWindow.isBusy() ||
      this._challengeTrashWindow.isBusy() ||
      this._challengeScoreWindow.isBusy() ||
      this.someChildrenIsBusy();
  }

  someChildrenIsBusy() {
    return this._scene.children.some(sprite => {
      return (sprite instanceof CardsetSprite) && (sprite.hasCommands() || sprite.isBusy());
    });
  }
}