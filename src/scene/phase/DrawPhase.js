class DrawPhase extends Phase {
  _playerBoardWindow;
  _playerBattleWindow;
  _playerTrashWindow;
  _playerScoreWindow;
  _playerBattleField;
  _challengeBoardWindow;
  _challengeBattleWindow;
  _challengeTrashWindow;
  _challengeScoreWindow;
  _challengeBattleField;

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

  createPlayerBattlefield(cards) {
    this._playerBattleField = CardsetSprite.create(20, 0);
    this._playerBattleField.setBackgroundColor('blue');
    const height = 120;
    const y = ScreenHelper.getBottomPosition(height);
    this._playerBattleField.alignAboveOf({ y, height });
    this.attachChild(this._playerBattleField);
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

  createChallengeBattlefield(cards) {
    this._challengeBattleField = CardsetSprite.create(20, 0);
    this._challengeBattleField.setBackgroundColor('red');
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
      this.commandShowPlayerBattlefield,
      this.commandOpenChallengeBoardWindow,
      this.commandOpenChallengeBattleWindow,
      this.commandOpenChallengeTrashWindow,
      this.commandOpenChallengeScoreWindow,
      this.commandShowChallengeBattlefield,
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

  commandShowPlayerBattlefield() {
    this._playerBattleField.show();
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

  commandShowChallengeBattlefield() {
    this._challengeBattleField.show();
  }

}