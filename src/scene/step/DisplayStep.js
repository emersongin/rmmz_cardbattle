class DisplayStep extends Step {
  _titleWindow = {};
  _descriptionWindow = {};

  constructor(scene, phase, finish) {
    const phasesEnabled = [GameConst.CHALLENGE_PHASE, GameConst.START_PHASE, GameConst.DRAW_PHASE, GameConst.LOAD_PHASE];
    if (!phasesEnabled.some(p => p === phase)) {
      throw new Error('Invalid phase for DisplayStep.');
    }
    super(scene, phase, finish);
  }

  start(manager) {
    const phase = this.getPhase();
    const title = this.getPhaseTitle(phase);
    const description = this.getPhaseDescription(phase, manager);
    this.createTitleWindow(title);
    this.createDescriptionWindow(description);
    this.openTextWindows();
  }

  getPhaseTitle(phase) {
    switch (phase) {
      case GameConst.CHALLENGE_PHASE:
        return 'Challenge Phase';
        break;
      case GameConst.START_PHASE:
        return 'Start Phase';
        break;
      case GameConst.DRAW_PHASE:
        return 'Draw Phase';
        break; 
      case GameConst.LOAD_PHASE:
        return 'Load Phase';
        break;
      default:
        return 'Unknown Phase';
        break;
    }
  }

  getPhaseDescription(phase, manager) {
    switch (phase) {
      case GameConst.CHALLENGE_PHASE:
        return manager.getChallengeDescription();
        break;
      case GameConst.START_PHASE:
        return 'Draw Calumon to go first.';
        break;
      case GameConst.DRAW_PHASE:
        return '6 cards will be drawn.';
        break;
      case GameConst.LOAD_PHASE:
        return 'Select and use a Program Card.';
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
    if (this.isBusy() || this.hasActions()) return false;
    if (Input.isTriggered('ok')) {
      const phase = this.getPhase();
      this.commandCloseTextWindows();
      this.leaveTextWindows();
      this.addWait();
      this.addAction(this.finish, phase);
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
    if (typeof this._finish === 'function') return this._finish();
    switch (phase) {
      case null:
        break;
      default:
        break;
    }
  }

  isBusy() {
    const children = [
      this._titleWindow,
      this._descriptionWindow,
    ];
    return super.isBusy() || children.some(obj => (obj?.isBusy ? obj.isBusy() : false));
  }

  isTitleWindowVisible() {
    return this._titleWindow.visible;
  }

  isDescriptionWindowVisible() {
    return this._descriptionWindow.visible;
  }
  
}