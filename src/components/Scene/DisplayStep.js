class DisplayStep extends Step {
  _titleWindow = undefined;
  _descriptionWindow = undefined;

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
    super(scene, phase);
  }

  start() {
    const title = this.getPhaseTitle();
    const description = this.getPhaseDescription();
    this.createTitleWindow(title);
    this.createDescriptionWindow(description);
    this.openTextWindows();
  }

  getPhaseTitle() {
    const phase = this.getPhase();
    switch (phase) {
      case GameConst.CHALLENGE_PHASE:
        return ['Challenge Phase'];
        break;
      case GameConst.START_PHASE:
        return ['Start Phase'];
        break;
      case GameConst.DRAW_PHASE:
        return ['Draw Phase'];
        break; 
      case GameConst.LOAD_PHASE:
        return ['Load Phase'];
        break;
      default:
        return ['Unknown Phase'];
        break;
    }
  }

  getPhaseDescription() {
    const phase = this.getPhase();
    switch (phase) {
      case GameConst.CHALLENGE_PHASE:
        return CardBattleManager.getChallengeDescription();
        break;
      case GameConst.START_PHASE:
        return ['Draw Calumon to go first.'];
        break;
      case GameConst.DRAW_PHASE:
        return ['6 cards will be drawn.'];
        break;
      case GameConst.LOAD_PHASE:
        return ['Select and use a Program Card.'];
        break;
      default:
        return ['Unknown Phase'];
        break;
    }
  }

  createTitleWindow(text) {
    const title = TextWindow.setTextColor(text, GameColors.ORANGE);
    const titleWindow = TextWindow.createWindowFullSize(0, 0, [title]);
    titleWindow.alignBelowOf({ y: 200, height: 0 });
    titleWindow.alignTextCenter();
    this.addAction(this.commandCreateTitleWindow, titleWindow);
  }

  commandCreateTitleWindow(titleWindow) {
    this._titleWindow = titleWindow;
    this.commandAddChild(titleWindow);
  }

  createDescriptionWindow(texts) {
    const maxSize = 3;
    const heightLines = Array(maxSize).fill('\n');
    const content = texts.concat(heightLines);
    const maxContent = content.slice(0, maxSize);
    const descriptionWindow = TextWindow.createWindowFullSize(0, 0, maxContent);
    descriptionWindow.alignCenterBelowMiddle();
    this.addAction(this.commandCreateDescriptionWindow, descriptionWindow);
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

  update() {
    super.update();
    if (this.isBusy() || this.hasActions()) return false;
    if (Input.isTriggered('ok')) {
      this.commandCloseTextWindows();
      this.leaveTextWindows();
      this.addAction(this.commandFinish);
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

  commandFinish() {
    const phase = this.getPhase();
    switch (phase) {
      case GameConst.CHALLENGE_PHASE:
        const playerFolders = CardBattleManager.getPlayerFolders();
        const setPlayerFolderIndexHandler = folderIndex => {
          CardBattleManager.setPlayerFolderIndex(folderIndex);
        };
        this.changeStep(FolderStep, playerFolders, setPlayerFolderIndexHandler);
        break;
      case GameConst.START_PHASE:
        const setMiniGameResultHanlder = win => {
          if (win) CardBattleManager.playerStart();
        };
        this.changeStep(MiniGameStep, setMiniGameResultHanlder);
        break;
      case GameConst.DRAW_PHASE:
        this.changeStep(DrawStep);
        break;
      case GameConst.LOAD_PHASE:
        const handlers = {
          playerPlayHandler: () => {
            const handlers = {
              goBackHandler: () => {},
              selectHandler: () => {},
              moveCursorHandler: () => {},
            };
            const config = {
              location: GameConst.HAND,
              player: GameConst.PLAYER,
              blockBattleCards: true,
              blockPowerCardsInLoadPhase: true,
            };
            this.changeStep(ZoneStep, config, handlers);
          },
          playerPassedHandler: () => {
            CardBattleManager.playerPassed();
          },
          challengedPlayHandler: () => {
            this.changeStep(SlotStep);
          },
          challengedPassedHandler: () => {
            CardBattleManager.challengedPassed();
          },
          activePowerfieldHandler: () => {
            this.changeStep(PowerStep);
          },
        };
        this.changeStep(TurnStep, handlers);
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
    return this._titleWindow?.visible;
  }

  isDescriptionWindowVisible() {
    return this._descriptionWindow?.visible;
  }

  isTitleWindowText(text) {
    return this._titleWindow.isTextWasDrawn('TEXT_0', text);
  }

  isDescriptionWindowText(texts) {
    return texts.some((text, index) => this._descriptionWindow.isTextWasDrawn(`TEXT_${index}`, text));
  }

  isTitleWindowClosed() {
    return this._titleWindow?.isClosed();
  }

  isDescriptionWindowClosed() {
    return this._descriptionWindow?.isClosed();
  }
}