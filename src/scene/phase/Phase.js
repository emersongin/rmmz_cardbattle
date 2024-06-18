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
    battlefield: {},
  };
  _challenge = {
    boardWindow: {},
    battleWindow: {},
    trashWindow: {},
    scoreWindow: {},
    battlefield: {},
  };

  constructor(scene) {
    if ((scene instanceof Scene_Message) === false) {
      throw new Error('Scene must be an instance of Scene_Message');
    }
    this._scene = scene;
  }

  createPlayerGameBoard(player, energies) {
    const { cardsInTrash, cardsInDeck, cardsInHand, victories } = player;
    this.createPlayerBoardWindow(energies, cardsInDeck, cardsInHand);
    this.createPlayerBattleWindow();
    this.createPlayerTrashWindow(cardsInTrash);
    this.createPlayerScoreWindow(victories);
    this.createPlayerBattlefield();
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

  createPlayerBattlefield() {
    const paddingLeft = this.getPaddingLeftBattleField();
    this._player.battlefield = CardsetSprite.create(paddingLeft, 0);
    const height = 120;
    const y = ScreenHelper.getBottomPosition(height);
    this._player.battlefield.alignAboveOf({ y, height });
    this.attachChild(this._player.battlefield);
  }

  getPaddingLeftBattleField() {
    const fieldWidth = ScreenHelper.getFieldWidth();
    const battlefieldWidth = CardsetSprite.contentOriginalWidth();
    const paddingLeft = (fieldWidth - battlefieldWidth) / 2;
    return paddingLeft;
  }

  createChallengeGameBoard(challenge, energies) {
    const { cardsInTrash, cardsInDeck, cardsInHand, victories } = challenge;
    this.createChallengeBoardWindow(energies, cardsInDeck, cardsInHand);
    this.createChallengeBattleWindow();
    this.createChallengeTrashWindow(cardsInTrash);
    this.createChallengeScoreWindow(victories);
    this.createChallengeBattlefield();
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

  createChallengeBattlefield() {
    const paddingLeft = this.getPaddingLeftBattleField();
    this._challenge.battlefield = CardsetSprite.create(paddingLeft, 0);
    const height = 128;
    const y = ScreenHelper.getTopPosition();
    this._challenge.battlefield.alignBelowOf({ y, height });
    this.attachChild(this._challenge.battlefield);
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
      this.commandOpenPlayerBattlefield,
      this.commandOpenChallengeBoardWindow,
      this.commandOpenChallengeBattleWindow,
      this.commandOpenChallengeTrashWindow,
      this.commandOpenChallengeScoreWindow,
      this.commandOpenChallengeBattlefield,
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

  commandOpenPlayerBattlefield() {
    this._player.battlefield.openCards();
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
      this.commandClosePlayerBoardWindow,
      this.commandClosePlayerBattleWindow,
      this.commandClosePlayerTrashWindow,
      this.commandClosePlayerScoreWindow,
      this.commandClosePlayerBattlefield,
      this.commandCloseChallengeBoardWindow,
      this.commandCloseChallengeBattleWindow,
      this.commandCloseChallengeTrashWindow,
      this.commandCloseChallengeScoreWindow,
      this.commandCloseChallengeBattlefield,
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

  commandClosePlayerBattlefield() {
    this._player.battlefield.closeCards();
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
      this._titleWindow,
      this._descriptionWindow,
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

  setStep(step) {
    this.addAction(this.commandChangeStep, step);
    this.stepWainting();
  }

  commandChangeStep(step) {
    this._step = step;
    this.commandWait(0.5);
  }

  stepWainting() {
    this._step = GameConst.WAITING_PHASE;
    this.commandWait(0.5);
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

  stepStart() {
    this._step = GameConst.START_PHASE;
    this.commandWait(0.5);
  }

  stepEnd() {
    this._step = GameConst.END_PHASE;
    this.commandWait(0.5);
  }

  addWait(seconds = 0.6) {
    this.addAction(this.commandWait, seconds);
  }

  commandWait(seconds) {
    this._wait = seconds * GameConst.FPS;
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

  removeChild(child) {
    this._scene.removeChild(child);
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

  challengePass() {
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