class LoadPhase extends Phase {
  _textWindow = {};
  _askWindow = {};
  _playerBoardWindow = {};
  _playerBattleWindow = {};
  _playerTrashWindow = {};
  _playerScoreWindow = {};
  _challengeBoardWindow = {};
  _challengeBattleWindow = {};
  _challengeTrashWindow = {};
  _challengeScoreWindow = {};

  createTextWindow(text) {
    this._textWindow = TextWindow.createWindowFullSize(0, 0, [text]);
    this._textWindow.alignCenterMiddle();
    this._textWindow.alignTextCenter();
    this.attachChildLast(this._textWindow);
  }

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

  stepBeginLoadPhase() {
    this.addAction(this.commandChangeStep, GameConst.BEGIN_LOAD_PHASE);
  }

  isStepBeginLoadPhase() {
    return this.isCurrentStep(GameConst.BEGIN_LOAD_PHASE);
  }

  stepPlayerLoadPhase() {
    this.addAction(this.commandChangeStep, GameConst.PLAYER_LOAD_PHASE);
  }

  isStepPlayerLoadPhase() {
    return this.isCurrentStep(GameConst.PLAYER_LOAD_PHASE);
  }

  stepChallengeLoadPhase() {
    this.addAction(this.commandChangeStep, GameConst.CHALLENGE_LOAD_PHASE);
  }

  isStepChallengeLoadPhase() {
    return this.isCurrentStep(GameConst.CHALLENGE_LOAD_PHASE);
  }

  stepWaintingPhase() {
    this._step = GameConst.WAITING_PHASE;
    this._wait = 0.5 * GameConst.FPS;
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

  openBeginLoadPhaseWindow() {
    this.addAction(this.commandOpenTextWindow);
  }

  commandOpenTextWindow() {
    this._textWindow.open();
  }

  closeBeginLoadPhaseWindow() {
    this.addAction(this.commandCloseTextWindow);
  }

  commandCloseTextWindow() {
    this._textWindow.close();
  }

  chanllengePass() {
    this.addAction(this.commandChallengePass);
  }

  commandChallengePass() {
    this._challengeBoardWindow.pass();
  }

  playerPass() {
    this.addAction(this.commandPlayerPass);
  }

  commandPlayerPass() {
    this._playerBoardWindow.pass();
  }

  createAskWindow(text, yesHandler, noHanlder) {
    const commandYes = CommandWindow.createCommand('Yes', 'YES', yesHandler);
    const commandNo = CommandWindow.createCommand('No', 'NO', noHanlder);
    this._askWindow = CommandWindow.create(0, 0, [text], [commandYes, commandNo]);
    this._askWindow.alignBottom();
    this.addWindow(this._askWindow);
  }

  openAskWindow() {
    this.addAction(this.commandOpenAskWindow);
  }

  commandOpenAskWindow() {
    this._askWindow.open();
  }

  closeAskWindow() {
    this.addAction(this.commandCloseAskWindow);
  }

  commandCloseAskWindow() {
    this._askWindow.close();
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
      this._textWindow.isBusy() ||
      this.someChildrenIsBusy();
  }

  someChildrenIsBusy() {
    return this._scene.children.some(sprite => {
      return (sprite instanceof CardsetSprite) && (sprite.hasCommands() || sprite.isBusy());
    });
  }
}