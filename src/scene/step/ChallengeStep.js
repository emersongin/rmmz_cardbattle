class ChallengeStep extends Step {
  _titleWindow = {};
  _descriptionWindow = {};

  start(manager) {
    const phase = this.getPhase();
    const title = this.getPhaseTitle(phase);
    const description = manager.getChallengeDescription();
    this.createTitleWindow(title);
    this.createDescriptionWindow(description);
    this.openTextWindows();
  }

  getPhaseTitle(phase) {
    switch (phase) {
      case GameConst.CHALLENGE_PHASE:
        return 'Challenge Phase';
        break;
      default:
        return 'Unknown Phase';
        break;
    }
  }

  createTitleWindow(text) {
    const title = TextWindow.setTextColor(text, GameColors.ORANGE);
    const titleWindow = TextWindow.createWindowFullSize(0, 0, [title]);
    titleWindow.alignBelowOf({ y: 200, height: 0 });
    titleWindow.alignTextCenter();
    this.addAction(this.commandCreateTitleWindow, titleWindow);
    return titleWindow;
  }

  commandCreateTitleWindow(titleWindow) {
    this._titleWindow = titleWindow;
    this.commandAddChild(titleWindow);
  }

  createDescriptionWindow(...texts) {
    const maxSize = 3;
    const heightLines = Array(maxSize).fill('\n');
    const content = [...texts, ...heightLines];
    const maxContent = content.slice(0, maxSize);
    const descriptionWindow = TextWindow.createWindowFullSize(0, 0, maxContent);
    descriptionWindow.alignCenterBelowMiddle();
    this.addAction(this.commandCreateDescriptionWindow, descriptionWindow);
    return descriptionWindow;
  }

  commandCreateDescriptionWindow(descriptionWindow) {
    this._descriptionWindow = descriptionWindow;
    this.commandAddChild(descriptionWindow);
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

  update(manager) {
    super.update();
    if (this.isBusy()) return false;
    if (Input.isTriggered('ok')) {
      const phase = this.getPhase();
      this.commandCloseTextWindows();
      this.leaveTextWindows();
      this.addWait();
      this.finish(phase);
    }
  }

  commandCloseTextWindows() {
    this.commandCloseTitleWindow();
    this.commandCloseDescriptionWindow();
  }

  commandCloseTitleWindow() {
    this._titleWindow.close();
  } 

  commandCloseDescriptionWindow() {
    this._descriptionWindow.close();
  }

  leaveTextWindows() {
    this.addAction(this.commandLeaveTextWindows);
  }

  commandLeaveTextWindows() {
    this.removeChildren([
      this._titleWindow,
      this._descriptionWindow,
    ]);
  }

  finish(phase) {
    switch (phase) {
      case null:
        break;
      default:
        break;
    }
  }

  isTitleWindowVisible() {
    return this._titleWindow.visible;
  }

  isDescriptionWindowVisible() {
    return this._descriptionWindow.visible;
  }
  
}