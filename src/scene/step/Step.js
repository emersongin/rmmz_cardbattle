class Step {
  _scene;
  _actionsQueue = [];
  _wait = 0;
  _player = {
    boardWindow: {},
    battleWindow: {},
    trashWindow: {},
    scoreWindow: {},
    battlefield: {},
  };
  _challenge = {
    boardWindow: {},
    battleWindow: {},
    trashWindow: {},
    scoreWindow: {},
    battlefield: {},
  };

  constructor(scene, finish) {
    if ((scene instanceof Scene_Message) === false) {
      throw new Error('Scene must be an instance of Scene_Message');
    }
    this._scene = scene;
    this._finish = finish;
  }

  update() {
    if (this._wait > 0) return this._wait--;
    if (this.hasActions() && this.isAvailable()) this.executeAction();
  }

  hasActions() {
    return this._actionsQueue.length > 0;
  }

  isAvailable() {
    return this.isBusy() === false;
  }

  isBusy() {
    const children = [
      this._player.boardWindow,
      this._player.battleWindow,
      this._player.trashWindow,
      this._player.scoreWindow,
      this._player.battlefield,
      this._challenge.boardWindow,
      this._challenge.battleWindow,
      this._challenge.trashWindow,
      this._challenge.scoreWindow,
      this._challenge.battlefield,
    ];
    return this._wait > 0 || children.some(obj => (obj.isBusy ? obj.isBusy() : false)) || this.someChildrenIsBusy();
  }

  someChildrenIsBusy() {
    if (!this._scene.children || this._scene.children.length === 0) return false;
    return this._scene.children.some(sprite => {
      return (sprite instanceof CardsetSprite) && (sprite.hasCommands() || sprite.isBusy());
    });
  }

  executeAction() {
    const actions = this._actionsQueue[0];
    if (actions.length > 0) {
      const completed = this.processActions(actions);
      if (completed) {
        this._actionsQueue.shift();
      }
    }
  }

  processActions(actions) {
    let processed = false;
    for (const action of actions) {
      const completed = action.execute();
      if (completed) {
        processed = true;
        continue;
      }
      break;
    }
    return processed;
  }

  addAction(fn, ...params) {
    const action = this.createAction(fn, ...params);
    const actions = ArrayHelper.toArray(action);
    this._actionsQueue.push(actions);
  }

  createAction(fn, ...params) {
    const action = { 
      fn: fn.name || 'anonymous',
      execute: () => {
        const result = fn.call(this, ...params);
        return typeof result === 'boolean' ? result : true;
      }
    };
    return action;
  }

  addActions(actions) {
    actions = ArrayHelper.toArray(actions);
    actions = actions.map((fn, ...params) => {
      if (Array.isArray(fn)) return this.createAction(fn[0], ...fn.slice(1));
      return this.createAction(fn)
    });
    this._actionsQueue.push(actions);
  }

  addWait(seconds = 0.6) {
    this.addAction(this.commandWait, seconds);
  }

  commandWait(seconds) {
    this._wait = seconds * GameConst.FPS;
  }

  addChild(child) {
    this.addAction(this.commandAddChild, child);
  }

  commandAddChild(child) {
    if (child instanceof Window_Base) {
      this._scene.addWindow(child);
    } else {
      this._scene.addChild(child);
    }
  }

  removeChildren(children) {
    children.forEach(child => this.removeChild(child));
  }

  removeChild(child) {
    this.addAction(this.commandRemoveChild, child);
  }

  commandRemoveChild(child) {
    if (child instanceof Window_Base) {
      this._scene.addWindow(child);
    } else {
      this._scene.removeChild(child);
    }
  }

  getPhase() {
    return this._scene.getPhase();
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

  createPlayerBoardWindow(energies, cardsInDeck, cardsInHand, passed = false) {
    const boardWindow = BoardWindow.create(0, 0);
    boardWindow.changeBlueColor();
    boardWindow.alignStartBottom();
    const points = [...energies, cardsInDeck, cardsInHand];
    boardWindow.refreshPoints(...points);
    if (passed) boardWindow.pass();
    this.addAction(this.commandCreatePlayerBoardWindow, boardWindow);
    return boardWindow;
  }

  commandCreatePlayerBoardWindow(boardWindow) {
    this._player.boardWindow = boardWindow;
    this.commandAddChild(boardWindow);
  }

  createPlayerBattleWindow(height = this._player.boardWindow.height) {
    const battleWindow = BattlePointsWindow.create(0, 0);
    battleWindow.changeBlueColor();
    battleWindow.alignStartBottom();
    const y = ScreenHelper.getBottomPosition(height);
    battleWindow.alignAboveOf({ y, height });
    battleWindow.refresh();
    this.addAction(this.commandCreatePlayerBattleWindow, battleWindow);
    return battleWindow;
  }

  commandCreatePlayerBattleWindow(battleWindow) {
    this._player.battleWindow = battleWindow;
    this.commandAddChild(this._player.battleWindow);
  }

  createPlayerTrashWindow(cardsInTrash) {
    const trashWindow = TrashWindow.create(0, 0);
    trashWindow.changeBlueColor();
    trashWindow.alignEndBelowMiddle();
    trashWindow.refreshPoints(cardsInTrash);
    this.addAction(this.commandCreatePlayerTrashWindow, trashWindow);
    return trashWindow;
  }

  commandCreatePlayerTrashWindow(trashWindow) {
    this._player.trashWindow = trashWindow;
    this.commandAddChild(trashWindow);
  }

  createPlayerScoreWindow(victories, height = this._player.boardWindow.height) {
    const scoreWindow = ScoreWindow.create(0, 0);
    scoreWindow.changeBlueColor();
    scoreWindow.alignEndBottom();
    const y = ScreenHelper.getBottomPosition(height);
    scoreWindow.alignAboveOf({ y, height });
    scoreWindow.refreshScore(victories);
    this.addAction(this.commandCreatePlayerScoreWindow, scoreWindow);
    return scoreWindow;
  }

  commandCreatePlayerScoreWindow(scoreWindow) {
    this._player.scoreWindow = scoreWindow;
    this.commandAddChild(scoreWindow);
  }

  createPlayerBattlefield() {
    const paddingLeft = this.getPaddingLeftBattleField();
    const battlefield = CardsetSprite.create(paddingLeft, 0);
    const height = 120;
    const y = ScreenHelper.getBottomPosition(height);
    battlefield.alignAboveOf({ y, height });
    this.addAction(this.commandCreatePlayerBattlefield, battlefield);
    return battlefield;
  }

  getPaddingLeftBattleField() {
    const fieldWidth = ScreenHelper.getFieldWidth();
    const battlefieldWidth = CardsetSprite.contentOriginalWidth();
    const paddingLeft = (fieldWidth - battlefieldWidth) / 2;
    return paddingLeft;
  }

  commandCreatePlayerBattlefield(battlefield) {
    this._player.battlefield = battlefield;
    this.commandAddChild(battlefield);
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

  createChallengeBoardWindow(energies, cardsInDeck, cardsInHand, passed = false) {
    const boardWindow = BoardWindow.create(0, 0);
    boardWindow.changeRedColor();
    boardWindow.alignStartTop();
    const points = [...energies, cardsInDeck, cardsInHand];
    boardWindow.refreshPoints(...points);
    if (passed) boardWindow.pass();
    this.addAction(this.commandCreateChallengeBoardWindow, boardWindow);
    return boardWindow;
  }

  commandCreateChallengeBoardWindow(boardWindow) {
    this._challenge.boardWindow = boardWindow;
    this.commandAddChild(boardWindow);
  }

  createChallengeBattleWindow(height = this._challenge.boardWindow.height) {
    const battleWindow = BattlePointsWindow.create(0, 0);
    battleWindow.changeRedColor();
    battleWindow.alignStartTop();
    const y = ScreenHelper.getTopPosition();
    battleWindow.alignBelowOf({ y, height });
    battleWindow.refresh();
    this.addAction(this.commandCreateChallengeBattleWindow, battleWindow);
    return battleWindow;
  }

  commandCreateChallengeBattleWindow(battleWindow) {
    this._challenge.battleWindow = battleWindow;
    this.commandAddChild(battleWindow);
  }

  createChallengeTrashWindow(cardsInTrash) {
    const trashWindow = TrashWindow.create(0, 0);
    trashWindow.changeRedColor();
    trashWindow.alignEndAboveMiddle();
    trashWindow.reverseIcons();
    trashWindow.refreshPoints(cardsInTrash);
    this.addAction(this.commandCreateChallengeTrashWindow, trashWindow);
    return trashWindow;
  }

  commandCreateChallengeTrashWindow(trashWindow) {
    this._challenge.trashWindow = trashWindow;
    this.commandAddChild(trashWindow);
  }

  createChallengeScoreWindow(victories, height = this._challenge.boardWindow.height) {
    const scoreWindow = ScoreWindow.create(0, 0);
    scoreWindow.changeRedColor();
    scoreWindow.alignEndTop();
    const y = ScreenHelper.getTopPosition();
    scoreWindow.alignBelowOf({ y, height });
    scoreWindow.refreshScore(victories);
    this.addAction(this.commandCreateChallengeScoreWindow, scoreWindow);
    return scoreWindow;
  }

  commandCreateChallengeScoreWindow(scoreWindow) {
    this._challenge.scoreWindow = scoreWindow;
    this.commandAddChild(scoreWindow);
  }

  createChallengeBattlefield() {
    const paddingLeft = this.getPaddingLeftBattleField();
    const battlefield = CardsetSprite.create(paddingLeft, 0);
    const height = 128;
    const y = ScreenHelper.getTopPosition();
    battlefield.alignBelowOf({ y, height });
    this.addAction(this.commandCreateChallengeBattlefield, battlefield);
    return battlefield;
  }

  commandCreateChallengeBattlefield(battlefield) {
    this._challenge.battlefield = battlefield;
    this.commandAddChild(battlefield);
  }

  getPlayerBoardWindow() {
    return this._player.boardWindow;
  }

  getPlayerBattleWindow() {
    return this._player.battleWindow;
  }

  getPlayerTrashWindow() {
    return this._player.trashWindow;
  }

  getPlayerScoreWindow() {
    return this._player.scoreWindow;
  }

  getPlayerBattlefield() {
    return this._player.battlefield;
  }

  getChallengeBoardWindow() {
    return this._challenge.boardWindow;
  }

  getChallengeBattleWindow() {
    return this._challenge.battleWindow;
  }

  getChallengeTrashWindow() {
    return this._challenge.trashWindow;
  }

  getChallengeScoreWindow() {
    return this._challenge.scoreWindow;
  }

  getChallengeBattlefield() {
    return this._challenge.battlefield;
  }

  openGameBoards() {
    this.addActions([
      this.commandOpenPlayerGameBoard,
      this.commandOpenChallengeGameBoard,
    ]);
  }

  commandOpenPlayerGameBoard() {
    this.commandOpenPlayerBoardWindow();
    this.commandOpenPlayerBattleWindow();
    this.commandOpenPlayerTrashWindow();
    this.commandOpenPlayerScoreWindow();
    this.commandOpenPlayerBattlefield();
  }

  commandOpenPlayerBoardWindow() {
    this._player.boardWindow.open();
  }

  commandOpenPlayerBattleWindow() {
    this._player.battleWindow.open();
  }

  commandOpenPlayerTrashWindow() {
    this._player.trashWindow.open();
  }

  commandOpenPlayerScoreWindow() {
    this._player.scoreWindow.open();
  }

  commandOpenPlayerBattlefield() {
    this._player.battlefield.openCards();
  }
  
  commandOpenChallengeGameBoard() {
    this.commandOpenChallengeBoardWindow();
    this.commandOpenChallengeBattleWindow();
    this.commandOpenChallengeTrashWindow();
    this.commandOpenChallengeScoreWindow();
    this.commandOpenChallengeBattlefield();
  }

  commandOpenChallengeBoardWindow() {
    this._challenge.boardWindow.open();
  }

  commandOpenChallengeBattleWindow() {
    this._challenge.battleWindow.open();
  }

  commandOpenChallengeTrashWindow() {
    this._challenge.trashWindow.open();
  }

  commandOpenChallengeScoreWindow() {
    this._challenge.scoreWindow.open();
  }

  commandOpenChallengeBattlefield() {
    this._challenge.battlefield.openCards();
  }

  closeGameBoards() {
    this.addActions([
      this.closePlayerGameBoard,
      this.closeChallengeGameBoard
    ]);
  }

  closePlayerGameBoard() {
    this.commandClosePlayerBoardWindow();
    this.commandClosePlayerBattleWindow();
    this.commandClosePlayerTrashWindow();
    this.commandClosePlayerScoreWindow();
    this.commandClosePlayerBattlefield();
  }

  commandClosePlayerBoardWindow() {
    this._player.boardWindow.close();
  }

  commandClosePlayerBattleWindow() {
    this._player.battleWindow.close();
  }

  commandClosePlayerTrashWindow() {
    this._player.trashWindow.close();
  }

  commandClosePlayerScoreWindow() {
    this._player.scoreWindow.close();
  }

  commandClosePlayerBattlefield() {
    this._player.battlefield.closeCards();
  }

  closeChallengeGameBoard() {
    this.commandCloseChallengeBoardWindow();
    this.commandCloseChallengeBattleWindow();
    this.commandCloseChallengeTrashWindow();
    this.commandCloseChallengeScoreWindow();
    this.commandCloseChallengeBattlefield();
  }

  commandCloseChallengeBoardWindow() {
    this._challenge.boardWindow.close();
  }

  commandCloseChallengeBattleWindow() {
    this._challenge.battleWindow.close();
  }

  commandCloseChallengeTrashWindow() {
    this._challenge.trashWindow.close();
  }

  commandCloseChallengeScoreWindow() {
    this._challenge.scoreWindow.close();
  }

  commandCloseChallengeBattlefield() {
    this._challenge.battlefield.closeCards();
  }

  leaveGameBoards() {
    this.addAction(this.commandLeaveGameBoards);
  }

  commandLeaveGameBoards() {
    this.removeChildren([
      this._player.boardWindow,
      this._player.battleWindow,
      this._player.trashWindow,
      this._player.scoreWindow,
      this._player.battlefield,
      this._challenge.boardWindow,
      this._challenge.battleWindow,
      this._challenge.trashWindow,
      this._challenge.scoreWindow,
      this._challenge.battlefield,
    ]);
  }

  isPlayerBoardWindowVisible() {
    return this._player.boardWindow.visible;
  }

  isChallengeBoardWindowVisible() {
    return this._challenge.boardWindow.visible;
  }

  isPlayerBattleWindowVisible() {
    return this._player.battleWindow.visible;
  }

  isChallengeBattleWindowVisible() {
    return this._challenge.battleWindow.visible;
  }

  isPlayerTrashWindowVisible() {
    return this._player.trashWindow.visible;
  }

  isChallengeTrashWindowVisible() {
    return this._challenge.trashWindow.visible;
  }

  isPlayerScoreWindowVisible() {
    return this._player.scoreWindow.visible;
  }

  isChallengeScoreWindowVisible() {
    return this._challenge.scoreWindow.visible;
  }

  isPlayerBattlefieldVisible() {
    return this._player.battlefield.visible;
  }

  isChallengeBattlefieldVisible() {
    return this._challenge.battlefield.visible;
  }
}