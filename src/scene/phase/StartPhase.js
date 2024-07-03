class StartPhase extends Phase {
  _resultWindow = {};
  _cards = [];
  _drawCardGame = {};

  createDrawCardGame() {
    const drawCardGame = CardsetSprite.create(0, 0);
    drawCardGame.centralize();
    drawCardGame.commandShow();
    const cards = this.createCardsShuffled();
    const sprites = drawCardGame.setCards(cards, Graphics.boxWidth, Graphics.boxHeight);
    const xSprite1 = -(drawCardGame.x + CardSprite.contentOriginalWidth());
    const ySprite1 = -(drawCardGame.y + CardSprite.contentOriginalHeight());
    const position1 = CardSprite.createPosition(xSprite1, ySprite1, 0);
    const xSprite2 = (Graphics.boxWidth - drawCardGame.x);
    const ySprite2 = (Graphics.boxHeight - drawCardGame.y);
    const position2 = CardSprite.createPosition(xSprite2, ySprite2, 1);
    const positions = [position1, position2];
    drawCardGame.setAllCardsInPositions(sprites, positions);
    drawCardGame.setTurnToDownCards(sprites);
    this.addAction(this.commandCreateDrawCardGame, drawCardGame);
    return drawCardGame;
  }

  commandCreateDrawCardGame(drawCardGame) {
    this._drawCardGame = drawCardGame;
    this.commandAddChild(drawCardGame);
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

  startDrawCardGame(onSelectHandler) {
    this.addAction(this.commandStartDrawCardGame, onSelectHandler);
  }

  commandStartDrawCardGame(onSelectHandler) {
    this.showCards();
    this.moveAllCardsToCenter();
    const handlerDecorator = (cards) => {
      const selectedIndex = cards.shift();
      const cardColor = this._cards[selectedIndex].color;
      const win = cardColor === GameConst.WHITE;
      const resultWindow = this.createResultWindow(win);
      this.endDrawCardGame(selectedIndex);
      onSelectHandler(win, resultWindow);
    }
    this.selectMode(handlerDecorator);
  }

  showCards() {
    this.addAction(this.commandShowCards);
  }
  
  commandShowCards() {
    this._drawCardGame.showCards();
  }

  moveAllCardsToCenter() {
    this.addAction(this.commandMoveAllCardsToCenter);
  }

  commandMoveAllCardsToCenter() {
    const center = this._drawCardGame.width / 2;
    const x = center - CardSprite.contentOriginalWidth();
    const space = 2;
    const position1 = CardSprite.createPosition(x - space, 0, 0);
    const position2 = CardSprite.createPosition(center + space, 0, 1);
    const positions = [position1, position2];
    const sprites = this._drawCardGame.getSprites();
    this._drawCardGame.moveAllCardsToPositions(sprites, positions);
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

  selectMode(onSelectHandler) {
    this.addAction(this.commandSelectMode, onSelectHandler);
  }

  commandSelectMode(onSelectHandler) {
    const selectNumber = 1;
    this._drawCardGame.selectMode(selectNumber, onSelectHandler);
  }
  
  isBusy() {
    const children = [
      this._drawCardGame,
      this._resultWindow,
    ];
    return super.isBusy() || children.some(obj => (obj.isBusy ? obj.isBusy() : false));
  }

  endDrawCardGame(selectedIndex) {
    this.addAction(this.commandEndDrawCardGame, selectedIndex);
  }

  commandEndDrawCardGame(selectedIndex) {
    const cardset = this._drawCardGame;
    const sprites = ArrayHelper.moveToStartByIndex(cardset.getSprites(), selectedIndex);
    const selectedSprite = sprites[0];
    const startIndex = 0;
    cardset.removeChild(sprites[1]);
    cardset.addChildAt(sprites[1], startIndex);
    cardset.zoomAllCards(selectedSprite);
    cardset.zoomOutAllCards(selectedSprite);
    cardset.addWait();
    cardset.flipTurnToUpCards(sprites);
  }

  openResultWindow() {
    this.addAction(this.commandOpenResultWindow);
  }

  commandOpenResultWindow() {
    this._resultWindow.open();
  }

  closeDrawCardGame() {
    this.addActions([
      this.commandCloseResultWindow,
      this.commandCloseDrawCardGame,
    ]);
  }
  
  commandCloseResultWindow() {
    this._resultWindow.close();
  }

  commandCloseDrawCardGame() {
    this._drawCardGame.closeAllCards();
  }

  leaveDrawCardGame() {
    this.addActions([
      this.commandLeaveDrawCardGame,
      this.commandLeaveResultWindow,
    ]);
  }

  commandLeaveDrawCardGame() {
    this.removeChild(this._drawCardGame);
  }

  commandLeaveResultWindow() {
    this.removeChild(this._resultWindow);
  }

  getResultWindow() {
    return this._resultWindow;
  }

  getDrawCardGameCardset() {
    return this._drawCardGame;
  }

  start(manager) {
    const title = 'Start Phase';
    const description = 'Draw Calumon to go first.';
    this.createTitleWindow(title);
    this.createDescriptionWindow(description);
    this.openTextWindows();
    this.setStep(GameConst.START_PHASE);
  }
  
  update(manager) {
    super.update();
    if (this.isBusy()) return false;
    this.updateStepStart(manager);
    this.updateStepEnd(manager);
  }

  updateStepStart(manager) {
    if (this.isCurrentStep(GameConst.START_PHASE) && Input.isTriggered('ok')) {
      this.commandCloseTextWindows();
      this.leaveTextWindows();
      const resultHandler = (win, resultWindow) => {
        manager.win = win;
        this.openResultWindow();
        this.setStep(GameConst.END_DRAW_CARD_GAME);
      };
      const drawCardGame = this.createDrawCardGame();
      this.startDrawCardGame(resultHandler);
      this.setStep(GameConst.START_DRAW_CARD_GAME);
    }
  }

  updateStepEnd(manager) {
    if (this.isCurrentStep(GameConst.END_DRAW_CARD_GAME) && Input.isTriggered('ok')) {
      this.closeDrawCardGame();
      this.leaveDrawCardGame();
      this.addWait();
      this.addAction(manager.endPhase);
    }
  }

  isResultWindowVisible() {
    return this._resultWindow.visible
  }

  isCardsetVisible() {
    return this._drawCardGame.visible;
  }






  // createConfirmWindow(message) {
  //   // message = 'confirm the selection?'
  //   const confirmHandler = () => {
  //     this._onSelectHandler(this._selectedIndexs);
  //   };
  //   const returnHandler = () => {
  //     this.returnToSelection();
  //   };
  //   const commandYes = CommandWindow.createCommand('Yes', 'YES', confirmHandler);
  //   const commandNo = CommandWindow.createCommand('No', 'NO', returnHandler);
  //   const text = [message];
  //   this._confirmWindow = CommandWindow.create(0, 0, text, [commandYes, commandNo]);
  //   this._confirmWindow.alignMiddle();
  //   this._cardset.addChild(this._confirmWindow);
  // }

  // returnToSelection() {
  //   if (this.selectIsFull()) {
  //     this._selectedIndexs.pop();
  //   }
  //   this.updateSelectSprites();
  //   this.updateHoverSprites();
  //   this.closeConfirmWindow();
  // }

  // openConfirmWindow() {
  //   this._confirmWindow.open();
  // }

  // closeConfirmWindow() {
  //   this._confirmWindow.close();
  // }

  // isWindowBusy() {
  //   return this._confirmWindow.isOpen();
  // }
}