class CardBattlePhase {
  scene;

  constructor(scene) {
    this.scene = scene;
    this.createTitleWindow();
    this.showTitleWindowChallengePhase();
  }

  createTitleWindow() {
    const rect = new Rectangle(0, 0, Graphics.boxWidth, Graphics.boxHeight);
    this.titleWindow = new TextWindow(rect);
    this.scene.addWindow(this.titleWindow);
  }

  showTitleWindowChallengePhase() {
    const orangeColor = 20;
    this.titleWindow.clearContent();
    this.titleWindow.addText('Card Battle Challenge');
    this.titleWindow.changeContentTextColor(orangeColor);
    this.titleWindow.alignContentCenter();
    this.titleWindow.moveWindowOnTopCenter();
    this.titleWindow.drawContentText();
    this.titleWindow.open();
  }

  update() {
    this.updateInput();
    this.updateTeminate();
  }

  updateInput() {
    if (Input.isTriggered('ok')) {
      if (this.titleWindow.isOpen()) this.titleWindow.close();
    }
  }

  updateTeminate() {
    if (this.titleWindow.isAvailable() && this.titleWindow.isClosed()) {
      this.scene.removeWindow(this.titleWindow);
      this.scene.changePhase(CardBattleTestPhase2);
    }
  }
}