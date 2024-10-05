class Step {
  _scene;
  _phase;
  _actionsQueue = [];
  _wait = 0;
  _player = {
    boardWindow: undefined,
    battleWindow: undefined,
    trashWindow: undefined,
    scoreWindow: undefined,
    cardsetSprite: undefined,
  };
  _challenged = {
    boardWindow: undefined,
    battleWindow: undefined,
    trashWindow: undefined,
    scoreWindow: undefined,
    cardsetSprite: undefined,
  };
  _powerFieldCardsetSprite = undefined;

  constructor(scene, phase) {
    const phasesEnabled = [
      GameConst.CHALLENGE_PHASE, 
      GameConst.START_PHASE, 
      GameConst.DRAW_PHASE, 
      GameConst.LOAD_PHASE,
      GameConst.SUMMON_PHASE,
    ];
    if (!phasesEnabled.some(p => p === phase)) {
      throw new Error('Invalid phase for DisplayStep.');
    }
    if ((scene instanceof Scene_Message) === false) {
      throw new Error('Scene must be an instance of Scene_Message');
    }
    if (String(phase).length === 0) {
      throw new Error('Phase must be a string');
    }
    this._scene = scene;
    this._phase = phase;
  }

  start() {
    throw new Error('Method start must be implemented');
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
      this._player.cardsetSprite,
      this._challenged.boardWindow,
      this._challenged.battleWindow,
      this._challenged.trashWindow,
      this._challenged.scoreWindow,
      this._challenged.cardsetSprite,
      this._powerFieldCardsetSprite,
    ];
    // console.log(
    //   '_player.boardWindow: ' + this._player.boardWindow?.isBusy(),
    //   '_player.battleWindow: ' + this._player.battleWindow?.isBusy(),
    //   '_player.trashWindow: ' + this._player.trashWindow?.isBusy(),
    //   '_player.scoreWindow: ' + this._player.scoreWindow?.isBusy(),
    //   '_player.cardsetSprite: ' + this._player.cardsetSprite?.isBusy(),
    //   '_challenged.boardWindow: ' + this._challenged.boardWindow?.isBusy(),
    //   '_challenged.battleWindow: ' + this._challenged.battleWindow?.isBusy(),
    //   '_challenged.trashWindow: ' + this._challenged.trashWindow?.isBusy(),
    //   '_challenged.scoreWindow: ' + this._challenged.scoreWindow?.isBusy(),
    //   '_challenged.cardsetSprite: ' + this._challenged.cardsetSprite?.isBusy(),
    //   '_powerFieldCardsetSprite: ' + this._powerFieldCardsetSprite?.isBusy(),
    //   'this.someChildrenIsBusy(): ' + this.someChildrenIsBusy(),
    // );
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

  changeStep(stepName, ...params) {
    const step = new stepName(this._scene, this._phase, ...params);
    this._scene.setStep(step);
    return step;
  }

  // destroy() {
  //   this._actionsQueue = [];
  //   this._wait = 0;
  //   this._player = {};
  //   this._challenged = {};
  //   this._powerFieldCardsetSprite = {};
  // }

  getPhase() {
    return this._phase;
  }

  changePhase(phase) {
    this._phase = phase;
  }

  createGameBoards() {
    this.createPlayerGameBoard();
    this.createChallengedGameBoard();
  }

  createPlayerGameBoard() {
    const energies = Object.values(CardBattleManager.getPlayerEnergies());
    const cardsInDeck = CardBattleManager.getPlayerDeckLength();
    const cardsInHand = CardBattleManager.getPlayerHandLength();
    const cardsInTrash = CardBattleManager.getPlayerTrashLength();
    const victories = CardBattleManager.getPlayerVictories();
    const passed = CardBattleManager.isPlayerPassed();
    const boardWindow = this.createPlayerBoardWindow(energies, cardsInDeck, cardsInHand, passed);
    const boardWindowHeight = boardWindow.height;
    const battleWindow = this.createPlayerBattleWindow(boardWindowHeight);
    const trashWindow = this.createPlayerTrashWindow(cardsInTrash);
    const scoreWindow = this.createPlayerScoreWindow(victories, boardWindowHeight);
    const cardsetSprite = this.createPlayerCardsetSprite();
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

  createPlayerCardsetSprite() {
    const paddingLeft = this.getPaddingLeftCardsetSprite();
    const cardsetSprite = CardsetSprite.create(paddingLeft, 0);
    const height = 120;
    const y = ScreenHelper.getBottomPosition(height);
    cardsetSprite.alignAboveOf({ y, height });
    cardsetSprite.show();
    const cards = CardBattleManager.getPlayerfieldCards();
    const sprites = cardsetSprite.listCards(cards);
    cardsetSprite.startClosedCards(sprites);
    this.addAction(this.commandCreatePlayerCardsetSprite, cardsetSprite);
    return cardsetSprite;
  }

  getPaddingLeftCardsetSprite() {
    const fieldWidth = ScreenHelper.getFieldWidth();
    const cardsetSpriteWidth = CardsetSprite.contentOriginalWidth();
    const paddingLeft = (fieldWidth - cardsetSpriteWidth) / 2;
    return paddingLeft;
  }

  commandCreatePlayerCardsetSprite(cardsetSprite) {
    this._player.cardsetSprite = cardsetSprite;
    this.commandAddChild(cardsetSprite);
  }

  createChallengedGameBoard() {
    const energies = Object.values(CardBattleManager.getChallengedEnergies());
    const cardsInDeck = CardBattleManager.getChallengedDeckLength();
    const cardsInHand = CardBattleManager.getChallengedHandLength();
    const cardsInTrash = CardBattleManager.getChallengedTrashLength();
    const victories = CardBattleManager.getChallengedVictories();
    const passed = CardBattleManager.isChallengedPassed();
    const boardWindow = this.createChallengedBoardWindow(energies, cardsInDeck, cardsInHand, passed);
    const boardWindowHeight = boardWindow.height;
    const battleWindow = this.createChallengedBattleWindow(boardWindowHeight);
    const trashWindow = this.createChallengedTrashWindow(cardsInTrash);
    const scoreWindow = this.createChallengedScoreWindow(victories, boardWindowHeight);
    const cardsetSprite = this.createChallengedCardsetSprite();
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

  createChallengedCardsetSprite() {
    const paddingLeft = this.getPaddingLeftCardsetSprite();
    const cardsetSprite = CardsetSprite.create(paddingLeft, 0);
    const height = 128;
    const y = ScreenHelper.getTopPosition();
    cardsetSprite.alignBelowOf({ y, height });
    cardsetSprite.show();
    const cards = CardBattleManager.getChallengedfieldCards();
    const sprites = cardsetSprite.listCards(cards);
    cardsetSprite.startClosedCards(sprites);
    this.addAction(this.commandCreateChallengedCardsetSprite, cardsetSprite);
    return cardsetSprite;
  }

  commandCreateChallengedCardsetSprite(cardsetSprite) {
    this._challenged.cardsetSprite = cardsetSprite;
    this.commandAddChild(cardsetSprite);
  }

  createPowerFieldCardsetSprite(cards) {
    const x = ScreenHelper.getCenterPosition(CardsetSprite.contentOriginalWidth());
    const y = ScreenHelper.getMiddlePosition(CardsetSprite.contentOriginalHeight());
    const cardsetSprite = CardsetSprite.create(x, y);
    cardsetSprite.show();
    const numCards = cards.length;
    const lastIndex = numCards - 1;
    const numInfield = numCards - 1;
    if (numCards) {
      const cardX = CardsetSprite.contentOriginalWidth() - CardSprite.contentOriginalWidth();
      const cardy = 0;
      const lastPosition = CardsetSprite.createPosition(cardX, cardy, lastIndex);
      const positionsCreated = CardsetSprite.createPositionsList(numInfield);
      const positionsMerged = [...positionsCreated, lastPosition];
      const sprites = cardsetSprite.setCards(cards, 0, 0);
      cardsetSprite.setAllCardsInPositions(sprites, positionsMerged);
      cardsetSprite.startClosedCards(sprites);
    }
    this.addAction(this.commandCreatePowerfield, cardsetSprite);
    return cardsetSprite;
  }

  commandCreatePowerfield(cardsetSprite) {
    this._powerFieldCardsetSprite = cardsetSprite;
    this.commandAddChild(cardsetSprite);
  }

  getPlayerBoardWindow() {
    return this._player.boardWindow;
  }

  getPlayerBoardWindowValues() {
    return this._player.boardWindow.getValues();
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

  getPlayerCardsetSprite() {
    return this._player.cardsetSprite;
  }

  getChallengedBoardWindow() {
    return this._challenged.boardWindow;
  }

  getChallengedBoardWindowValues() {
    return this._challenged.boardWindow.getValues();
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

  getChallengedCardsetSprite() {
    return this._challenged.cardsetSprite;
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
    this.commandOpenPlayerCardsetSprite();
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

  commandOpenPlayerCardsetSprite() {
    this._player.cardsetSprite.openCards();
  }
  
  commandOpenChallengedGameBoard() {
    this.commandOpenChallengedBoardWindow();
    this.commandOpenChallengedBattleWindow();
    this.commandOpenChallengedTrashWindow();
    this.commandOpenChallengedScoreWindow();
    this.commandOpenChallengedCardsetSprite();
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

  commandOpenChallengedCardsetSprite() {
    this._challenged.cardsetSprite.openCards();
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
    this.commandClosePlayerCardsetSprite();
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

  commandClosePlayerCardsetSprite() {
    this._player.cardsetSprite.closeCards();
  }

  closeChallengedGameBoard() {
    this.commandCloseChallengedBoardWindow();
    this.commandCloseChallengedBattleWindow();
    this.commandCloseChallengedTrashWindow();
    this.commandCloseChallengedScoreWindow();
    this.commandCloseChallengedCardsetSprite();
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

  commandCloseChallengedCardsetSprite() {
    this._challenged.cardsetSprite.closeCards();
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
      this._player.cardsetSprite,
      this._challenged.boardWindow,
      this._challenged.battleWindow,
      this._challenged.trashWindow,
      this._challenged.scoreWindow,
      this._challenged.cardsetSprite,
    ]);
  }

  commandShowPlayerCardsetSprite() {
    this._player.cardsetSprite.show();
  }

  commandShowChallengedCardsetSprite() {
    this._challenged.cardsetSprite.show();
  }

  commandSetCardsPlayerCardsetSprite(cards, screenWidth) {
    return this._player.cardsetSprite.setCards(cards, screenWidth)
  }

  commandSetCardsChallengedCardsetSprite(cards, screenWidth) {
    return this._challenged.cardsetSprite.setCards(cards, screenWidth)
  }

  commandShowCardsPlayerCardsetSprite(sprites) {
    this._player.cardsetSprite.showCards(sprites);
  }

  commandShowCardsChallengedCardsetSprite(sprites) {
    this._challenged.cardsetSprite.showCards(sprites);
  }

  commandSetTurnToDownCardsPlayerCardsetSprite(sprites) {
    this._player.cardsetSprite.setTurnToDownCards(sprites);
  }

  commandSetTurnToDownCardsChallengedCardsetSprite(sprites) {
    this._challenged.cardsetSprite.setTurnToDownCards(sprites);
  }

  commandMoveCardsInlistPlayerCardsetSprite(sprites, delay, fieldUpdates) {
    this._player.cardsetSprite.moveCardsInlist(sprites, delay, fieldUpdates);
  }

  commandMoveCardsInlistChallengedCardsetSprite(sprites, delay, fieldUpdates) {
    this._challenged.cardsetSprite.moveCardsInlist(sprites, delay, fieldUpdates);
  }

  commandFlipTurnToUpCardsPlayerCardsetSprite(sprites) {
    this._player.cardsetSprite.flipTurnToUpCards(sprites);
  }

  commandFlashCardsAnimatePlayerCardsetSprite(sprites, color, duration, times, trigger) {
    this._player.cardsetSprite.flashCardsAnimate(sprites, color, duration, times, trigger);
  }

  commandFlashCardsAnimateChallengedCardsetSprite(sprites, color, duration, times, trigger) {
    this._challenged.cardsetSprite.flashCardsAnimate(sprites, color, duration, times, trigger);
  }

  commandGetSpritesPlayerCardsetSprite() {
    return this._player.cardsetSprite.getSprites();
  }

  commandGetSpritesChallengedCardsetSprite() {
    return this._challenged.cardsetSprite.getSprites();
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

  openPowerfield() {
    this.addAction(this.commandOpenPowerfield);
  }

  commandOpenPowerfield() {
    this._powerFieldCardsetSprite.openAllCards();
  }

  isPlayerBoardWindowVisible() {
    return this._player.boardWindow?.visible;
  }

  isChallengedBoardWindowVisible() {
    return this._challenged.boardWindow?.visible;
  }

  isPlayerBattleWindowVisible() {
    return this._player.battleWindow?.visible;
  }

  isChallengedBattleWindowVisible() {
    return this._challenged.battleWindow?.visible;
  }

  isPlayerTrashWindowVisible() {
    return this._player.trashWindow?.visible;
  }

  isChallengedTrashWindowVisible() {
    return this._challenged.trashWindow?.visible;
  }

  isPlayerScoreWindowVisible() {
    return this._player.scoreWindow?.visible;
  }

  isChallengedScoreWindowVisible() {
    return this._challenged.scoreWindow?.visible;
  }

  isPlayerCardsetSpriteVisible() {
    return this._player.cardsetSprite?.visible;
  }

  isChallengedCardsetSpriteVisible() {
    return this._challenged.cardsetSprite?.visible;
  }

  isPowerFieldCardsetSpriteVisible() {
    return this._powerFieldCardsetSprite?.visible;
  }

  getPowerfieldCardsetSprite() {
    return this._powerFieldCardsetSprite;
  }

  isPlayerBoardWindowClosed() {
    return this._player.boardWindow?.isClosed();
  }

  isPlayerBattleWindowClosed() {
    return this._player.battleWindow?.isClosed();
  }

  isPlayerTrashWindowClosed() {
    return this._player.trashWindow?.isClosed();
  }

  isPlayerScoreWindowClosed() {
    return this._player.scoreWindow?.isClosed();
  }

  allPlayerCardsAreOpen() {
    return this._player.cardsetSprite?.allCardsAreOpen();
  }

  allPlayerCardsClosed() {
    return this._player.cardsetSprite?.allCardsAreClosed();
  }

  isChallengedBoardWindowClosed() {
    return this._challenged.boardWindow?.isClosed();
  }

  isChallengedBattleWindowClosed() {
    return this._challenged.battleWindow?.isClosed();
  }

  isChallengedTrashWindowClosed() {
    return this._challenged.trashWindow?.isClosed();
  }

  isChallengedScoreWindowClosed() {
    return this._challenged.scoreWindow?.isClosed();
  }

  allChallengedCardsAreOpen() {
    return this._challenged.cardsetSprite?.allCardsAreOpen();
  }

  allChallengedCardsAreClosed() {
    return this._challenged.cardsetSprite?.allCardsAreClosed();
  }
}