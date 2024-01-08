
class CardBattleScene extends Scene_Message {
  initialize() {
    super.initialize();
    this._titleWindow = null;
    this._textWindow = null;
    this._chooseFolderWindow = null;
  }

  create() {
    super.create();
    // this.createDisplayObjects();

    const cardset = new CardsetSprite();
    this.addChild(cardset);

    cardset.setCards([
      { type: 1, color: 3, figureName: 'cardback', attack: 0, health: 0 }
    ]);
    const cardIndexs1 = cardset.getIndexAddedCardSprites();
    cardset.showCards(cardIndexs1);
    cardset.addCards([
      { type: 1, color: 3, figureName: 'cardback', attack: 0, health: 99 },
      { type: 1, color: 3, figureName: 'cardback', attack: 99, health: 0 },
      { type: 1, color: 3, figureName: 'cardback', attack: 99, health: 99 },
      { type: 2, color: 3, figureName: 'cardback', attack: 99, health: 99 },
      { type: 3, color: 3, figureName: 'cardback', attack: 99, health: 99 }
    ]);
    const cardIndexs2 = cardset.getIndexAddedCardSprites();
    cardset.startShowCardsMoving(cardIndexs2);
    
  }

  createDisplayObjects() {
    this.createSpriteset();
    this.createWindowLayer();
    this.createAllWindows();
  }

  createSpriteset() {
    this._spriteset = new CardBattleSpriteset();
    this.addChild(this._spriteset);
  }

  createAllWindows() {
    this.createTitleWindow();
    this.createTextWindow();
    this.createChooseFolderWindow();
    super.createAllWindows();
  }

  createTitleWindow() {
    const rect = new Rectangle(0, 0, Graphics.boxWidth, Graphics.boxHeight);
    this._titleWindow = new TextWindow(rect);
    this.addWindow(this._titleWindow);
  }

  createTextWindow() {
    const rect = new Rectangle(0, 0, Graphics.boxWidth, Graphics.boxHeight);
    this._textWindow = new TextWindow(rect);
    this.addWindow(this._textWindow);
  }

  createChooseFolderWindow() {
    const rect = new Rectangle(0, 0, Graphics.boxWidth, Graphics.boxHeight);
    this._chooseFolderWindow = new ChooseFolderWindow(rect);
    this.addWindow(this._chooseFolderWindow);
  }

  start() {
    super.start();
    CardBattleManager.setup();
  }

  update() {
    if (!this.isBusy()) {
      // this.updateWindows();
      // CardBattleManager.update();
    }
    super.update();
  }

  isBusy() {
    return (
      // this._spriteset.isBusy() ||
      super.isBusy()
    );
  };

  updateWindows() {
    this.updateChallengePhaseWindows();
    this.updateChooseFolderPhaseWindows();
    this.updateStartPhaseWindows();
    this.updatePhaseChanged();
  }

  updateChallengePhaseWindows() {
    if (CardBattleManager.isChallengerPhase() && !CardBattleManager.isPhaseChanged()) {
      if (this._titleWindow.isClosed() && this.isNoBusyWindows()) 
        this.showTitleWindowChallengePhase();
      if (this._textWindow.isClosed() && this.isNoBusyWindows()) 
        this.showTextWindowChallengePhase();
    }
  }
  
  isNoBusyWindows() {
    return !this.isAnyWindowBusy();
  }

  isAnyWindowBusy() {
    return (
      this._titleWindow.isOpening() ||
      this._textWindow.isOpening() ||
      this._chooseFolderWindow.isOpening()
    );
  }

  showTitleWindowChallengePhase() {
    const orangeColor = 20;
    this._titleWindow.clearContent();
    this._titleWindow.addText('Card Battle Challenge');
    this._titleWindow.changeContentTextColor(orangeColor);
    this._titleWindow.alignContentCenter();
    this._titleWindow.moveWindowOnTopCenter();
    this._titleWindow.drawContentText();
    this._titleWindow.open();
  }

  showTextWindowChallengePhase() {
    const enemyName = CardBattleManager.getEnemyName();
    const enemyLevel = CardBattleManager.getEnemyLevel();
    this._textWindow.clearContent();
    this._textWindow.addText(`Lv ${enemyLevel}`);
    this._textWindow.addText(enemyName);
    this._textWindow.drawContentText();
    this._textWindow.moveWindowToCenter();
    this._textWindow.open();
  }

  updateChooseFolderPhaseWindows() {
    if (CardBattleManager.isChooseFolderPhase() && !CardBattleManager.isPhaseChanged()) {
      if (this._titleWindow.isClosed() && this.isNoBusyWindows()) 
        this.showTitleWindowChooseFolderPhase();
      if (this._chooseFolderWindow.isClosed() && this.isNoBusyWindows()) 
        this.showChooseFolderWindowChooseFolderPhase();
    }
  }

  showTitleWindowChooseFolderPhase() {
    this._titleWindow.clearContent();
    this._titleWindow.addText('Choose a folder');
    this._titleWindow.alignContentCenter();
    this._titleWindow.moveWindowToBetweenTopAndCenter();
    this._titleWindow.drawContentText();
    this._titleWindow.open();
  }

  showChooseFolderWindowChooseFolderPhase() {
    const firstFolderName = CardBattleManager.getPlayerFolderName(0);
    const middleFolderName = CardBattleManager.getPlayerFolderName(1);
    const lastFolderName = CardBattleManager.getPlayerFolderName(2);
    this._chooseFolderWindow.refresh([
      { name: firstFolderName },
      { name: middleFolderName },
      { name: lastFolderName }
    ]);
    this._chooseFolderWindow.setHandler('FIRST_FOLDER', () => { this.selectPlayerFolderCommand(0) });
    this._chooseFolderWindow.setHandler('MIDDLE_FOLDER', () => { this.selectPlayerFolderCommand(1) });
    this._chooseFolderWindow.setHandler('LAST_FOLDER', () => { this.selectPlayerFolderCommand(2) });
    this._chooseFolderWindow.moveWindowToCenter();;
    this._chooseFolderWindow.open();
  }

  updateStartPhaseWindows() {
    if (CardBattleManager.isStartPhase() && !CardBattleManager.isPhaseChanged()) {
      if (this._titleWindow.isClosed() && this.isNoBusyWindows()) 
        this.showTitleWindowStartPhase();
      if (this._textWindow.isClosed() && this.isNoBusyWindows()) 
        this.showTextWindowStartPhase();
    }
  }

  showTitleWindowStartPhase() {
    this._titleWindow.clearContent();
    this._titleWindow.addText('Start Phase');
    this._titleWindow.alignContentCenter();
    this._titleWindow.moveWindowOnTopCenter();
    this._titleWindow.drawContentText();
    this._titleWindow.open();
  }

  showTextWindowStartPhase() {
    this._textWindow.clearContent();
    this._textWindow.addText('Draw white card to go first.');
    this._textWindow.drawContentText();
    this._textWindow.moveWindowToCenter();
    this._textWindow.open();
  }

  updatePhaseChanged() {
    if (CardBattleManager.isPhaseChanged()) {
      if (this._titleWindow.isOpen()) this._titleWindow.close();
      if (this._textWindow.isOpen()) this._textWindow.close();
      if (this._chooseFolderWindow.isOpen()) this._chooseFolderWindow.close();
      setTimeout(() => {
        if (this.isNoBusyWindows()) CardBattleManager.phaseChangeDone();
      }, 400);
    }
  }

  selectPlayerFolderCommand(number) {
    CardBattleManager.selectPlayerFolder(number);
  }

  stop() {
    super.stop();
  }

  terminate() {
    super.terminate();
  }
}