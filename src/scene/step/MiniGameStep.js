class MiniGameStep extends Step {
  _cards = [];
  _cardsetSprite = undefined;
  _resultWindow = undefined;
  _selectHandler = undefined;
  _miniGame = false;

  constructor(scene, phase, selectHandler, finish) {
    const phasesEnabled = [GameConst.START_PHASE];
    if (!phasesEnabled.some(p => p === phase)) {
      throw new Error('Invalid phase for MiniGameStep.');
    }
    super(scene, phase, finish);
    if (typeof selectHandler !== 'function') {
      throw new Error('Invalid selectHandler for MiniGameStep.');
    }
    this._selectHandler = selectHandler;
  }

  start(manager) {
    this.createCardsetSprite();
    this.startMiniGame();
  }

  createCardsetSprite() {
    const cardsetSprite = CardsetSprite.create(0, 0);
    cardsetSprite.centralize();
    cardsetSprite.commandShow();
    const cards = this.createCardsShuffled();
    const sprites = cardsetSprite.setCards(cards, Graphics.boxWidth, Graphics.boxHeight);
    const xSprite1 = -(cardsetSprite.x + CardSprite.contentOriginalWidth());
    const ySprite1 = -(cardsetSprite.y + CardSprite.contentOriginalHeight());
    const position1 = CardSprite.createPosition(xSprite1, ySprite1, 0);
    const xSprite2 = (Graphics.boxWidth - cardsetSprite.x);
    const ySprite2 = (Graphics.boxHeight - cardsetSprite.y);
    const position2 = CardSprite.createPosition(xSprite2, ySprite2, 1);
    const positions = [position1, position2];
    cardsetSprite.setAllCardsInPositions(sprites, positions);
    cardsetSprite.setTurnToDownCards(sprites);
    this.addAction(this.commandCreateCardsetSprite, cardsetSprite);
  }

  commandCreateCardsetSprite(cardsetSprite) {
    this._cardsetSprite = cardsetSprite;
    this.commandAddChild(cardsetSprite);
  }

  createCardsShuffled() {
    const cards = [
      {
        type: 2,
        color: GameConst.WHITE,
        figureName: 'default',
        attack: 0,
        health: 0
      },
      {
        type: 2,
        color: GameConst.BLACK,
        figureName: 'default',
        attack: 0,
        health: 0
      },
    ];
    this._cards = ArrayHelper.shuffle(cards);
    return this._cards;
  }

  startMiniGame() {
    this.addAction(this.commandStartMiniGame);
  }

  commandStartMiniGame() {
    this.showCards();
    this.moveAllCardsToCenter();
    const handlerDecorator = (cards) => {
      const selectedIndex = cards.shift();
      const cardColor = this._cards[selectedIndex].color;
      const win = cardColor === GameConst.WHITE;
      this.finishMiniGame(selectedIndex);
      this.createResultWindow(win);
      this.openResultWindow();
      this.addAction(this.endGame);
      this._selectHandler(win);
    }
    this.selectMode(handlerDecorator);
  }

  showCards() {
    this.addAction(this.commandShowCards);
  }
  
  commandShowCards() {
    this._cardsetSprite.showCards();
  }

  moveAllCardsToCenter() {
    this.addAction(this.commandMoveAllCardsToCenter);
  }

  commandMoveAllCardsToCenter() {
    const center = this._cardsetSprite.width / 2;
    const x = center - CardSprite.contentOriginalWidth();
    const space = 2;
    const position1 = CardSprite.createPosition(x - space, 0, 0);
    const position2 = CardSprite.createPosition(center + space, 0, 1);
    const positions = [position1, position2];
    const sprites = this._cardsetSprite.getSprites();
    this._cardsetSprite.moveAllCardsToPositions(sprites, positions);
  }

  createResultWindow(win) {
    const text = win ? 'You go first!' : 'You go next!';
    const resultWindow = TextWindow.createWindowOneFourthSize(0, 0, [text]);
    resultWindow.alignCenterMiddle();
    resultWindow.alignBelowOf({ y: 100, height: 0 });
    resultWindow.alignTextCenter();
    this.addAction(this.commandCreateResultWindow, resultWindow);
    return resultWindow;
  }

  commandCreateResultWindow(resultWindow) {
    this._resultWindow = resultWindow;
    this.commandAddChild(resultWindow);
  }

  endGame() {
    this._miniGame = true;
  }

  finishMiniGame(selectedIndex) {
    this.addAction(this.commandFinishDrawCardGame, selectedIndex);
  }

  commandFinishDrawCardGame(selectedIndex) {
    const cardsetSprite = this._cardsetSprite;
    const spriteSet = cardsetSprite.getSprites();
    const sprites = ArrayHelper.moveToStartByIndex(spriteSet, selectedIndex);
    const selectedSprite = sprites[0];
    const startIndex = 0;
    cardsetSprite.removeChild(sprites[1]);
    cardsetSprite.addChildAt(sprites[1], startIndex);
    cardsetSprite.zoomAllCards(selectedSprite);
    cardsetSprite.zoomOutAllCards(selectedSprite);
    cardsetSprite.addWait();
    cardsetSprite.flipTurnToUpCards(sprites);
  }

  selectMode(onSelectHandler) {
    this.addAction(this.commandSelectMode, onSelectHandler);
  }

  commandSelectMode(onSelectHandler) {
    const selectNumber = 1;
    this._cardsetSprite.selectMode(selectNumber, onSelectHandler);
  }

  openResultWindow() {
    this.addAction(this.commandOpenResultWindow);
  }

  commandOpenResultWindow() {
    this._resultWindow.open();
  }

  update(manager) {
    super.update();
    if (this.isBusy() || this.hasActions()) return false;
    if (this.isEndGame() && Input.isTriggered('ok')) {
      this.commandCloseCardsetSprite();
      this.commandCloseResultWindow();
      this.leaveResultWindow();
      this.leaveCardsetSprite();
      this.addAction(this.commandFinish);
    }
  }

  commandCloseCardsetSprite() {
    this._cardsetSprite.closeCards();
  }

  leaveCardsetSprite() {
    this.addAction(this.commandLeaveCardsetSprite);
  }

  commandLeaveCardsetSprite() {
    this.removeChild(this._cardsetSprite);
  }

  isEndGame() {
    return this._miniGame;
  }

  commandCloseResultWindow() {
    this._resultWindow.close();
  }

  leaveResultWindow() {
    this.addAction(this.commandLeaveResultWindow);
  }

  commandLeaveResultWindow() {
    this.removeChild(this._resultWindow);
  }

  commandFinish() {
    const phase = this.getPhase();
    switch (phase) {
      case GameConst.START_PHASE:
        this.changePhase(GameConst.DRAW_PHASE);
        this.changeStep(DisplayStep);
        break;
      default:
        break;
    }
    this.end();
  }

  isBusy() {
    const children = [
      this._cardsetSprite,
      this._resultWindow,
    ];
    return super.isBusy() || children.some(obj => (obj?.isBusy ? obj.isBusy() : false));
  }

  isCardsetVisible() {
    return this._cardsetSprite?.visible;
  }

  isCardsetOnSelectMode() {
    return this._cardsetSprite.isSelectMode();
  }

  isCardsetShuffled() {
    return this._cards.length > 0;
  }

  isResultWindowVisible() {
    return this._resultWindow?.visible
  }

  isTextResultWindow(text) {
    return this._resultWindow.isTextWasDrawing('TEXT_0', text);
  }

  selectCardMiniGame(indexes) {
    indexes = ArrayHelper.toArray(indexes);
    this.addAction(this.commandSelectCardMiniGame, indexes);
  }

  commandSelectCardMiniGame(indexes) {
    this._cardsetSprite.select(indexes);
  }
}