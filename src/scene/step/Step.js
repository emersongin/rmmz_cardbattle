class Step {
  _scene;
  _phase;
  _actionsQueue = [];
  _wait = 0;
  _player = {
    boardWindow: {},
    battleWindow: {},
    trashWindow: {},
    scoreWindow: {},
    battlefield: {},
  };
  _challenged = {
    boardWindow: {},
    battleWindow: {},
    trashWindow: {},
    scoreWindow: {},
    battlefield: {},
  };
  _powerfield = {};
  _finish = null;

  constructor(scene, phase, finish) {
    if ((scene instanceof Scene_Message) === false) {
      throw new Error('Scene must be an instance of Scene_Message');
    }
    if (String(phase).length === 0) {
      throw new Error('Phase must be a string');
    }
    this._scene = scene;
    this._phase = phase;
    this._finish = finish;
  }

  start(manager) {
    throw new Error('Method start must be implemented');
  }

  update(manager) {
    if (this._wait > 0) return this._wait--;
    console.log(this.hasActions(), this.isAvailable());
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
      this._challenged.boardWindow,
      this._challenged.battleWindow,
      this._challenged.trashWindow,
      this._challenged.scoreWindow,
      this._challenged.battlefield,
    ];
    return this._wait > 0 || children.some(obj => (obj?.isBusy ? obj.isBusy() : false)) || this.someChildrenIsBusy();
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

  changePhase(phase) {
    this._scene.setPhase(phase);
  }

  changeStep(stepName) {
    const step = new stepName(this._scene);
    this._scene.setStep(step);
  }

  destroy() {
    this._actionsQueue = [];
    this._wait = 0;
    this._player = {};
    this._challenged = {};
    this._powerfield = {};
    this._finish = null;
  }

  getPhase() {
    return this._phase;
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

  commandCreatePlayerBoardWindow(boardWindow) { console.log(this);
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

  createChallengedGameBoard(manager) {
    const energies = Object.values(manager.getChallengedEnergies());
    const cardsInDeck = manager.getChallengedDeckLength();
    const cardsInHand = manager.getChallengedHandLength();
    const cardsInTrash = manager.getChallengedTrashLength();
    const victories = manager.getChallengedVictories();
    const passed = manager.isChallengedPassed();
    const boardWindow = this.createChallengedBoardWindow(energies, cardsInDeck, cardsInHand, passed);
    const boardWindowHeight = boardWindow.height;
    const battleWindow = this.createChallengedBattleWindow(boardWindowHeight);
    const trashWindow = this.createChallengedTrashWindow(cardsInTrash);
    const scoreWindow = this.createChallengedScoreWindow(victories, boardWindowHeight);
    const battlefield = this.createChallengedBattlefield();
  }

  createChallengedBoardWindow(energies, cardsInDeck, cardsInHand, passed = false) {
    const boardWindow = BoardWindow.create(0, 0);
    boardWindow.changeRedColor();
    boardWindow.alignStartTop();
    const points = [...energies, cardsInDeck, cardsInHand];
    boardWindow.refreshPoints(...points);
    if (passed) boardWindow.pass();
    this.addAction(this.commandCreateChallengedBoardWindow, boardWindow);
    return boardWindow;
  }

  commandCreateChallengedBoardWindow(boardWindow) {
    this._challenged.boardWindow = boardWindow;
    this.commandAddChild(boardWindow);
  }

  createChallengedBattleWindow(height = this._challenged.boardWindow.height) {
    const battleWindow = BattlePointsWindow.create(0, 0);
    battleWindow.changeRedColor();
    battleWindow.alignStartTop();
    const y = ScreenHelper.getTopPosition();
    battleWindow.alignBelowOf({ y, height });
    battleWindow.refresh();
    this.addAction(this.commandCreateChallengedBattleWindow, battleWindow);
    return battleWindow;
  }

  commandCreateChallengedBattleWindow(battleWindow) {
    this._challenged.battleWindow = battleWindow;
    this.commandAddChild(battleWindow);
  }

  createChallengedTrashWindow(cardsInTrash) {
    const trashWindow = TrashWindow.create(0, 0);
    trashWindow.changeRedColor();
    trashWindow.alignEndAboveMiddle();
    trashWindow.reverseIcons();
    trashWindow.refreshPoints(cardsInTrash);
    this.addAction(this.commandCreateChallengedTrashWindow, trashWindow);
    return trashWindow;
  }

  commandCreateChallengedTrashWindow(trashWindow) {
    this._challenged.trashWindow = trashWindow;
    this.commandAddChild(trashWindow);
  }

  createChallengedScoreWindow(victories, height = this._challenged.boardWindow.height) {
    const scoreWindow = ScoreWindow.create(0, 0);
    scoreWindow.changeRedColor();
    scoreWindow.alignEndTop();
    const y = ScreenHelper.getTopPosition();
    scoreWindow.alignBelowOf({ y, height });
    scoreWindow.refreshScore(victories);
    this.addAction(this.commandCreateChallengedScoreWindow, scoreWindow);
    return scoreWindow;
  }

  commandCreateChallengedScoreWindow(scoreWindow) {
    this._challenged.scoreWindow = scoreWindow;
    this.commandAddChild(scoreWindow);
  }

  createChallengedBattlefield() {
    const paddingLeft = this.getPaddingLeftBattleField();
    const battlefield = CardsetSprite.create(paddingLeft, 0);
    const height = 128;
    const y = ScreenHelper.getTopPosition();
    battlefield.alignBelowOf({ y, height });
    this.addAction(this.commandCreateChallengedBattlefield, battlefield);
    return battlefield;
  }

  commandCreateChallengedBattlefield(battlefield) {
    this._challenged.battlefield = battlefield;
    this.commandAddChild(battlefield);
  }

  createPowerfield(cards) {
    const x = ScreenHelper.getCenterPosition(CardsetSprite.contentOriginalWidth());
    const y = ScreenHelper.getMiddlePosition(CardsetSprite.contentOriginalHeight());
    const powerfield = CardsetSprite.create(x, y);
    powerfield.show();
    const xCard = CardsetSprite.contentOriginalWidth() - CardSprite.contentOriginalWidth();
    const sprites = powerfield.setCards(cards, xCard);
    powerfield.startClosedCards(sprites);
    this.addAction(this.commandCreatePowerfield, powerfield);
    return powerfield;
  }

  commandCreatePowerfield(powerfield) {
    this._powerfield = powerfield;
    this.commandAddChild(powerfield);
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

  getChallengedBoardWindow() {
    return this._challenged.boardWindow;
  }

  getChallengedBattleWindow() {
    return this._challenged.battleWindow;
  }

  getChallengedTrashWindow() {
    return this._challenged.trashWindow;
  }

  getChallengedScoreWindow() {
    return this._challenged.scoreWindow;
  }

  getChallengedBattlefield() {
    return this._challenged.battlefield;
  }

  openGameBoards() {
    this.addActions([
      this.commandOpenPlayerGameBoard,
      this.commandOpenChallengedGameBoard,
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
  
  commandOpenChallengedGameBoard() {
    this.commandOpenChallengedBoardWindow();
    this.commandOpenChallengedBattleWindow();
    this.commandOpenChallengedTrashWindow();
    this.commandOpenChallengedScoreWindow();
    this.commandOpenChallengedBattlefield();
  }

  commandOpenChallengedBoardWindow() {
    this._challenged.boardWindow.open();
  }

  commandOpenChallengedBattleWindow() {
    this._challenged.battleWindow.open();
  }

  commandOpenChallengedTrashWindow() {
    this._challenged.trashWindow.open();
  }

  commandOpenChallengedScoreWindow() {
    this._challenged.scoreWindow.open();
  }

  commandOpenChallengedBattlefield() {
    this._challenged.battlefield.openCards();
  }

  closeGameBoards() {
    this.addActions([
      this.closePlayerGameBoard,
      this.closeChallengedGameBoard
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

  closeChallengedGameBoard() {
    this.commandCloseChallengedBoardWindow();
    this.commandCloseChallengedBattleWindow();
    this.commandCloseChallengedTrashWindow();
    this.commandCloseChallengedScoreWindow();
    this.commandCloseChallengedBattlefield();
  }

  commandCloseChallengedBoardWindow() {
    this._challenged.boardWindow.close();
  }

  commandCloseChallengedBattleWindow() {
    this._challenged.battleWindow.close();
  }

  commandCloseChallengedTrashWindow() {
    this._challenged.trashWindow.close();
  }

  commandCloseChallengedScoreWindow() {
    this._challenged.scoreWindow.close();
  }

  commandCloseChallengedBattlefield() {
    this._challenged.battlefield.closeCards();
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
      this._challenged.boardWindow,
      this._challenged.battleWindow,
      this._challenged.trashWindow,
      this._challenged.scoreWindow,
      this._challenged.battlefield,
    ]);
  }

  commandShowChallengedBattlefield() {
    this._challenged.battlefield.show();
  }

  commandSetCardsChallengedBattlefield(cards, screenWidth) {
    return this._challenged.battlefield.setCards(cards, screenWidth)
  }

  commandShowCardsChallengedBattlefield(sprites) {
    this._challenged.battlefield.showCards(sprites);
  }

  commandSetTurnToDownCardsChallengedBattlefield(sprites) {
    this._challenged.battlefield.setTurnToDownCards(sprites);
  }

  commandMoveCardsInlistChallengedBattlefield(sprites, delay, fieldUpdates) {
    this._challenged.battlefield.moveCardsInlist(sprites, delay, fieldUpdates);
  }

  commandFlashCardsAnimateChallengedBattlefield(sprites, color, duration, times, trigger) {
    this._challenged.battlefield.flashCardsAnimate(sprites, color, duration, times, trigger);
  }

  commandGetSpritesChallengedBattlefield() {
    return this._challenged.battlefield.getSprites();
  }

  playerBoardWindowPass() {
    this.addAction(this.commandPlayerBoardWindowPass);
  }

  commandPlayerBoardWindowPass() {
    this._player.boardWindow.pass();
  }

  challengedBoardWindowPass() {
    this.addAction(this.commandChallengedBoardWindowPass);
  }

  commandChallengedBoardWindowPass() {
    this._challenged.boardWindow.pass();
  }

  isPlayerBoardWindowVisible() {
    return this._player.boardWindow.visible;
  }

  isChallengedBoardWindowVisible() {
    return this._challenged.boardWindow.visible;
  }

  isPlayerBattleWindowVisible() {
    return this._player.battleWindow.visible;
  }

  isChallengedBattleWindowVisible() {
    return this._challenged.battleWindow.visible;
  }

  isPlayerTrashWindowVisible() {
    return this._player.trashWindow.visible;
  }

  isChallengedTrashWindowVisible() {
    return this._challenged.trashWindow.visible;
  }

  isPlayerScoreWindowVisible() {
    return this._player.scoreWindow.visible;
  }

  isChallengedScoreWindowVisible() {
    return this._challenged.scoreWindow.visible;
  }

  isPlayerBattlefieldVisible() {
    return this._player.battlefield.visible;
  }

  isChallengedBattlefieldVisible() {
    return this._challenged.battlefield.visible;
  }
}