
class CardBattleScene extends Scene_Message {
  _titleWindow = null;
  _textWindow = null;
  _chooseFolderWindow = null;

  create() {
    super.create();
    this.createDisplayObjects();
  }

  createDisplayObjects() {
    this.createWindowLayer();
    this.createAllWindows();
  };

  createAllWindows() {
    this.createTitleWindow();
    this.createTextWindow();
    this.createChooseFolderWindow();
    super.createAllWindows();
  };

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
    this.updateWindows();
    CardBattleManager.update();
    super.update();
  }

  isAnyWindowBusy() {
    return (
      this._titleWindow.isOpening() ||
      this._textWindow.isOpening() ||
      this._chooseFolderWindow.isOpening()
  );
  }

  updateWindows() {
    this.updateChallengePhaseWindows();
    this.updateChooseFolderPhaseWindows();
  }

  updateChallengePhaseWindows() {
    if (CardBattleManager.isChallengerPhase()) {
      setTimeout(() => {
        if (this._titleWindow.isClosed() && !this.isAnyWindowBusy()) this.showTitleWindowChallengePhase();
        if (this._textWindow.isClosed() && !this.isAnyWindowBusy()) this.showTextWindowChallenge();
      }, 100);
    } else {
      if (CardBattleManager.isPhaseChanged()) {
        if (this._titleWindow.isOpen()) this._titleWindow.close();
        if (this._textWindow.isOpen()) this._textWindow.close();
        CardBattleManager.phaseChangeDone();
      }
    }
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

  showTextWindowChallenge() {
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
    if (CardBattleManager.isChooseFolderPhase()) {
      setTimeout(() => {
        if (this._titleWindow.isClosed() && !this.isAnyWindowBusy()) this.showTitleWindowChooseFolderPhase();
        if (this._chooseFolderWindow.isClosed() && !this.isAnyWindowBusy()) this.showChooseFolderWindowChooseFolderPhase();
      }, 500);
    } else {
      if (CardBattleManager.isPhaseChanged()) {
        if (this._titleWindow.isOpen()) this._titleWindow.close();
        if (this._chooseFolderWindow.isOpen()) this._chooseFolderWindow.close();
        CardBattleManager.phaseChangeDone(false);
      }
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
    this._chooseFolderWindow.setHandler("folder1", () => { this.execute(1) });
    this._chooseFolderWindow.setHandler("folder2", () => { this.execute(2) });
    this._chooseFolderWindow.setHandler("folder3", () => { this.execute(3) });
    this._chooseFolderWindow.moveWindowToCenter();;
    this._chooseFolderWindow.open();
  }

  execute(number) {
    console.log('action: ' + number);
  }

  stop() {
    super.stop();
  }

  terminate() {
    super.terminate();
  }
}