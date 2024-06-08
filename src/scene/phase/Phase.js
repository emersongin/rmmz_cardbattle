class Phase {
  _scene = {};
  _actionsQueue = [];
  _step = 'START';
  _wait = 0;
  _childrenToAdd = [];
  _childrenToAddLast = [];
  _titleWindow = {};
  _descriptionWindow = {};
  _player = {
    boardWindow: {},
    battleWindow: {},
    trashWindow: {},
    scoreWindow: {},
  };
  _challenge = {
    boardWindow: {},
    battleWindow: {},
    trashWindow: {},
    scoreWindow: {},
  };

  constructor(scene) {
    if ((scene instanceof Scene_Message) === false) {
      throw new Error('Scene must be an instance of Scene_Message');
    }
    this._scene = scene;
  }

  createPlayerGameBoard(cardsInTrash, cardsInDeck, cardsInHand, energies, victories) {
    this.createPlayerBoardWindow(energies, cardsInDeck, cardsInHand);
    this.createPlayerBattleWindow();
    this.createPlayerTrashWindow(cardsInTrash);
    this.createPlayerScoreWindow(victories);
  }

  createTitleWindow(text) {
    const title = TextWindow.setTextColor(text, GameColors.ORANGE);
    this._titleWindow = TextWindow.createWindowFullSize(0, 0, [title]);
    this._titleWindow.alignBelowOf({ y: 200, height: 0 });
    this._titleWindow.alignTextCenter();
    this.attachChild(this._titleWindow);
  }

  createDescriptionWindow(...texts) {
    const maxSize = 3;
    const heightLines = Array(maxSize).fill('\n');
    const content = [...texts, ...heightLines];
    const maxContent = content.slice(0, maxSize);
    this._descriptionWindow = TextWindow.createWindowFullSize(0, 0, maxContent);
    this._descriptionWindow.alignCenterBelowMiddle();
    this.attachChild(this._descriptionWindow);
  }

  createPlayerBoardWindow(energies, cardsInDeck, cardsInHand) {
    this._player.boardWindow = BoardWindow.create(0, 0);
    this._player.boardWindow.changeBlueColor();
    this._player.boardWindow.alignStartBottom();
    const points = [...energies, cardsInDeck, cardsInHand];
    this._player.boardWindow.refreshPoints(...points);
    this.attachChild(this._player.boardWindow);
  }

  createPlayerBattleWindow() {
    this._player.battleWindow = BattlePointsWindow.create(0, 0);
    this._player.battleWindow.changeBlueColor();
    this._player.battleWindow.alignStartBottom();
    const height = this._player.boardWindow.height;
    const y = ScreenHelper.getBottomPosition(height);
    this._player.battleWindow.alignAboveOf({ y, height });
    this._player.battleWindow.refresh();
    this.attachChild(this._player.battleWindow);
  }

  createPlayerTrashWindow(cardsInTrash) {
    this._player.trashWindow = TrashWindow.create(0, 0);
    this._player.trashWindow.changeBlueColor();
    this._player.trashWindow.alignEndBelowMiddle();
    this._player.trashWindow.refreshPoints(cardsInTrash);
    this.attachChild(this._player.trashWindow);
  }

  createPlayerScoreWindow(victories) {
    this._player.scoreWindow = ScoreWindow.create(0, 0);
    this._player.scoreWindow.changeBlueColor();
    this._player.scoreWindow.alignEndBottom();
    const height = this._player.boardWindow.height;
    const y = ScreenHelper.getBottomPosition(height);
    this._player.scoreWindow.alignAboveOf({ y, height });
    this._player.scoreWindow.refreshScore(victories);
    this.attachChild(this._player.scoreWindow);
  }

  createChallengeGameBoard(cardsInTrash, cardsInDeck, cardsInHand, energies, victories) {
    this.createChallengeBoardWindow(energies, cardsInDeck, cardsInHand);
    this.createChallengeBattleWindow();
    this.createChallengeTrashWindow(cardsInTrash);
    this.createChallengeScoreWindow(victories);
  }

  createChallengeBoardWindow(energies, cardsInDeck, cardsInHand) {
    this._challenge.boardWindow = BoardWindow.create(0, 0);
    this._challenge.boardWindow.changeRedColor();
    this._challenge.boardWindow.alignStartTop();
    const points = [...energies, cardsInDeck, cardsInHand];
    this._challenge.boardWindow.refreshPoints(...points);
    this.attachChild(this._challenge.boardWindow);
  }

  createChallengeBattleWindow() {
    this._challenge.battleWindow = BattlePointsWindow.create(0, 0);
    this._challenge.battleWindow.changeRedColor();
    this._challenge.battleWindow.alignStartTop();
    const height = this._player.boardWindow.height;
    const y = ScreenHelper.getTopPosition();
    this._challenge.battleWindow.alignBelowOf({ y, height });
    this._challenge.battleWindow.refresh();
    this.attachChild(this._challenge.battleWindow);
  }

  createChallengeTrashWindow(cardsInTrash) {
    this._challenge.trashWindow = TrashWindow.create(0, 0);
    this._challenge.trashWindow.changeRedColor();
    this._challenge.trashWindow.alignEndAboveMiddle();
    this._challenge.trashWindow.reverseIcons();
    this._challenge.trashWindow.refreshPoints(cardsInTrash);
    this.attachChild(this._challenge.trashWindow);
  }

  createChallengeScoreWindow(victories) {
    this._challenge.scoreWindow = ScoreWindow.create(0, 0);
    this._challenge.scoreWindow.changeRedColor();
    this._challenge.scoreWindow.alignEndTop();
    const height = this._player.boardWindow.height;
    const y = ScreenHelper.getTopPosition();
    this._challenge.scoreWindow.alignBelowOf({ y, height });
    this._challenge.scoreWindow.refreshScore(victories);
    this.attachChild(this._challenge.scoreWindow);
  }

  openTextWindows() {
    this.addActions([
      this.commandOpenTitleWindow,
      this.commandOpenDescriptionWindow,
    ]);
  }

  commandOpenTitleWindow() {
    this._titleWindow.open();
  }

  commandOpenDescriptionWindow() {
    this._descriptionWindow.open();
  }

  closeTextWindows() {
    this.addActions([
      this.commandCloseTitleWindow,
      this.commandCloseDescriptionWindow,
    ]);
  }

  commandCloseTitleWindow() {
    this._titleWindow.close();
  } 

  commandCloseDescriptionWindow() {
    this._descriptionWindow.close();
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

  update() {
    if (this._wait > 0) return this._wait--;
    if (this.hasActions() && this.isAvailable()) this.executeAction();
  }

  hasActions() {
    return this._actionsQueue.length > 0;
  }

  isAvailable() {
    return !this.isBusy();
  }

  isBusy() {
    return ;
  }

  isBusy() {
    const player = this._player;
    const challenge = this._challenge;
    return (this._wait > 0) || 
      this._titleWindow.isBusy() ||
      this._descriptionWindow.isBusy() ||
      (player.boardWindow.isBusy ? player.boardWindow.isBusy() : false) ||
      (player.battleWindow.isBusy ? player.battleWindow.isBusy() : false) ||
      (player.trashWindow.isBusy ? player.trashWindow.isBusy() : false) ||
      (player.scoreWindow.isBusy ? player.scoreWindow.isBusy() : false) ||
      (challenge.boardWindow.isBusy ? challenge.boardWindow.isBusy() : false) ||
      (challenge.battleWindow.isBusy ? challenge.battleWindow.isBusy() : false) ||
      (challenge.trashWindow.isBusy ? challenge.trashWindow.isBusy() : false) ||
      (challenge.scoreWindow.isBusy ? challenge.scoreWindow.isBusy() : false) ||
      this.someChildrenIsBusy();
  }

  someChildrenIsBusy() {
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
    const actions = this.toArray(action);
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
    actions = this.toArray(actions);
    actions = actions.map((fn, ...params) => {
      if (Array.isArray(fn)) return this.createAction(fn[0], ...fn.slice(1));
      return this.createAction(fn)
    });
    this._actionsQueue.push(actions);
  }

  toArray(items = []) {
    return (Array.isArray(items) === false) ? [items] : items;
  }

  addWait(seconds = 0.6) {
    this.addAction(this.commandWait, seconds);
  }

  commandWait(seconds) {
    this._wait = seconds * GameConst.FPS;
  }

  stepStart() {
    this.addAction(this.commandChangeStep, GameConst.START_PHASE);
  }

  commandChangeStep(step) {
    this._step = step;
    this._wait = 0.5 * GameConst.FPS;
  }

  stepWaintingPhase() {
    this._step = GameConst.WAITING_PHASE;
    this._wait = 0.5 * GameConst.FPS;
  }

  isStepStart() {
    return this.isCurrentStep(GameConst.START_PHASE);
  }

  isCurrentStep(step) {
    return this._step === step;
  }

  attachChild(child) {
    this._childrenToAdd.push(child);
  }

  attachChildLast(child) {
    this._childrenToAddLast.push(child);
  }

  addChildren() {
    this._childrenToAdd.forEach(child => this.addChild(child));
    this._childrenToAddLast.forEach(child => this.addChild(child));
  }

  addChild(child) {
    if (child instanceof Window_Base) {
      this.addWindows(child);
    } else {
      this._scene.addChild(child);
    }
  }

  addWindows(windows) {
    if (Array.isArray(windows) === false) windows = [windows];
    windows.forEach(window => this.addWindow(window));
  }

  addWindow(window) {
    this._scene.addWindow(window);
  }

  getTitleWindow() {
    return this._titleWindow;
  }

  getDescriptionWindow() {
    return this._descriptionWindow;
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

  chanllengePass() {
    this.addAction(this.commandChallengePass);
  }

  commandChallengePass() {
    this._challenge.boardWindow.pass();
  }

  playerPass() {
    this.addAction(this.commandPlayerPass);
  }

  commandPlayerPass() {
    this._player.boardWindow.pass();
  }
}