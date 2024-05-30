class StartPhase extends Phase {
  _titleWindow;
  _descriptionWindow;
  _cardDrawGameCardset;
  _resultWindow = {};
  _cards;

  createTitleWindow(text) {
    const title = TextWindow.setTextColor(text, GameColors.ORANGE);
    this._titleWindow = TextWindow.createWindowFullSize(0, 0, [title]);
    this._titleWindow.alignCenterAboveMiddle();
    this._titleWindow.alignTextCenter();
    this.attachChild(this._titleWindow);
  }

  createDescriptionWindow(text) {
    this._descriptionWindow = TextWindow.createWindowFullSize(0, 0, [text]);
    this._descriptionWindow.alignCenterMiddle();
    this.attachChild(this._descriptionWindow);
  }

  createCardDrawGameCardset() {
    this._cardDrawGameCardset = CardsetSprite.create(0, 0);
    this._cardDrawGameCardset.centralize();
    this._cardDrawGameCardset.commandShow();
    const cards = this.createCardsShuffled();
    const sprites = this._cardDrawGameCardset.setCards(cards, Graphics.boxWidth, Graphics.boxHeight);
    const xSprite1 = -(this._cardDrawGameCardset.x + CardSprite.contentOriginalWidth());
    const ySprite1 = -(this._cardDrawGameCardset.y + CardSprite.contentOriginalHeight());
    const position1 = CardSprite.createPosition(xSprite1, ySprite1, 0);
    const xSprite2 = (Graphics.boxWidth - this._cardDrawGameCardset.x);
    const ySprite2 = (Graphics.boxHeight - this._cardDrawGameCardset.y);
    const position2 = CardSprite.createPosition(xSprite2, ySprite2, 1);
    const positions = [position1, position2];
    this._cardDrawGameCardset.setAllCardsInPositions(sprites, positions);
    this._cardDrawGameCardset.setTurnToDownCards(sprites);
    this.attachChild(this._cardDrawGameCardset);
    return sprites;
  }

  createCardsShuffled() {
    const cards = [
      CardGenerator.generateGameCard('white'),
      CardGenerator.generateGameCard('black'),
    ];
    this._cards = ArrayHelper.shuffle(cards);
    return this._cards;
  }

  startCardDrawGame(selectHandler) {
    this.addAction(this.commandStartCardDrawGame, selectHandler);
  }

  commandStartCardDrawGame(selectHandler) {
    this.showCards();
    this.moveAllCardsToCenter();
    const handlerDecorator = (cards) => {
      const selectedIndex = cards.shift();
      const white = 4;
      const result = this._cards[selectedIndex].color === white;
      this.createResultWindow(result);
      this.endCardDrawGame(selectedIndex);
      this.openResultWindow();
      selectHandler(result);
    }
    this.selectMode(handlerDecorator);
  }

  showCards() {
    this.addAction(this.commandShowCards);
  }
  
  commandShowCards() {
    this._cardDrawGameCardset.showCards();
  }

  moveAllCardsToCenter() {
    this.addAction(this.commandMoveAllCardsToCenter);
  }

  commandMoveAllCardsToCenter() {
    const center = this._cardDrawGameCardset.width / 2;
    const x = center - CardSprite.contentOriginalWidth();
    const space = 2;
    const position1 = CardSprite.createPosition(x - space, 0, 0);
    const position2 = CardSprite.createPosition(center + space, 0, 1);
    const positions = [position1, position2];
    const sprites = this._cardDrawGameCardset.getSprites();
    this._cardDrawGameCardset.moveAllCardsToPositions(sprites, positions);
  }

  selectMode(selectHandler) {
    this.addAction(this.commandSelectMode, selectHandler);
  }

  commandSelectMode(selectHandler) {
    const selectNumber = 1;
    this._cardDrawGameCardset.selectMode(selectHandler, selectNumber);
  }

  openTitleWindow() {
    this.addAction(this.commandOpenTitleWindow);
  }

  commandOpenTitleWindow() {
    this._titleWindow.open();
  }

  closeTitleWindow() {
    this.addAction(this.commandCloseTitleWindow);
  }

  commandCloseTitleWindow() {
    this._titleWindow.close();
  } 

  openDescriptionWindow() {
    this.addAction(this.commandOpenDescriptionWindow);
  }

  commandOpenDescriptionWindow() {
    this._descriptionWindow.open();
  }

  closeDescriptionWindow() {
    this.addAction(this.commandCloseDescriptionWindow);
  }

  commandCloseDescriptionWindow() {
    this._descriptionWindow.close();
  }

  stepCardDrawGame() {
    this.addAction(this.commandChangeStep, GameConst.START_CARD_DRAW_GAME);
  }

  stepEndCardDrawGame() {
    this.addAction(this.commandChangeStep, GameConst.END_CARD_DRAW_GAME);
  }

  isStepEndCardDrawGame() {
    return this.getStep() === GameConst.END_CARD_DRAW_GAME;
  }
  
  isBusy() {
    return super.isBusy() || 
      this._titleWindow.isBusy() || 
      this._descriptionWindow.isBusy() ||
      this.someChildrenIsBusy();
  }

  someChildrenIsBusy() {
    return this._scene.children.some(sprite => {
      return (sprite instanceof CardsetSprite) && (sprite.hasCommands() || sprite.isBusy());
    });
  }

  endCardDrawGame(selectedIndex) {
    this.addAction(this.commandEndCardDrawGame, selectedIndex);
  }

  commandEndCardDrawGame(selectedIndex) {
    const cardset = this._cardDrawGameCardset;
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

  createResultWindow(result) {
    const text = result ? 'You win!' : 'You lose!';
    this._resultWindow = TextWindow.createWindowOneFourthSize(0, 0, [text]);
    this._resultWindow.alignCenterAboveMiddle();
    this._resultWindow.alignTextCenter();
    this.addWindow(this._resultWindow);
  }

  openResultWindow() {
    this.addAction(this.commandOpenResultWindow);
  }

  commandOpenResultWindow() {
    this._resultWindow.open();
  }

  closeResultWindow() {
    this.addAction(this.commandCloseResultWindow);
  }

  commandCloseResultWindow() {
    this._resultWindow.close();
  }

  closeCardDrawGameCardset() {
    this.addAction(this.commandCloseCardDrawGameCardset);
  }

  commandCloseCardDrawGameCardset() {
    this._cardDrawGameCardset.closeAllCards();
  }













  

  // createConfirmWindow(message) {
  //   // message = 'confirm the selection?'
  //   const confirmHandler = () => {
  //     this._selectHandler(this._selectedIndexs);
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