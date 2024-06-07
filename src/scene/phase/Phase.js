class Phase {
  _scene = {};
  _actionsQueue = [];
  _step = 'START';
  _wait = 0;
  _childrenToAdd = [];
  _childrenToAddLast = [];
  _titleWindow = {};
  _descriptionWindow = {};

  constructor(scene) {
    if ((scene instanceof Scene_Message) === false) {
      throw new Error('Scene must be an instance of Scene_Message');
    }
    this._scene = scene;
  }

  createTitleWindow(text) {
    const title = TextWindow.setTextColor(text, GameColors.ORANGE);
    this._titleWindow = TextWindow.createWindowFullSize(0, 0, [title]);
    this._titleWindow.alignBelowOf({ y: 200, height: 0 });
    this._titleWindow.alignTextCenter();
    this.attachChild(this._titleWindow);
  }

  createDescriptionWindow(...texts) {
    const maxSize = 3;
    const heightLines = Array(maxSize).fill('\n');
    const content = [...texts, ...heightLines];
    const maxContent = content.slice(0, maxSize);
    this._descriptionWindow = TextWindow.createWindowFullSize(0, 0, maxContent);
    this._descriptionWindow.alignCenterBelowMiddle();
    this.attachChild(this._descriptionWindow);
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

  closeTextWindows() {
    this.addActions([
      this.commandCloseTitleWindow,
      this.commandCloseDescriptionWindow,
    ]);
  }

  commandCloseTitleWindow() {
    this._titleWindow.close();
  } 

  commandCloseDescriptionWindow() {
    this._descriptionWindow.close();
  }

  update() {
    if (this._wait > 0) return this._wait--;
    if (this.hasActions() && this.isAvailable()) this.executeAction();
  }

  hasActions() {
    return this._actionsQueue.length > 0;
  }

  isAvailable() {
    return !this.isBusy();
  }

  isBusy() {
    return this._wait > 0;
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
    const actions = this.toArray(action);
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
    actions = this.toArray(actions);
    actions = actions.map((fn, ...params) => {
      if (Array.isArray(fn)) return this.createAction(fn[0], ...fn.slice(1));
      return this.createAction(fn)
    });
    this._actionsQueue.push(actions);
  }

  toArray(items = []) {
    return (Array.isArray(items) === false) ? [items] : items;
  }

  addWait(seconds = 0.6) {
    this.addAction(this.commandWait, seconds);
  }

  commandWait(seconds) {
    this._wait = seconds * GameConst.FPS;
  }

  stepStart() {
    this.addAction(this.commandChangeStep, GameConst.START_PHASE);
  }

  commandChangeStep(step) {
    this._step = step;
    this._wait = 0.5 * GameConst.FPS;
  }

  isStepStart() {
    return this.isCurrentStep(GameConst.START_PHASE);
  }

  isCurrentStep(step) {
    return this._step === step;
  }

  attachChild(child) {
    this._childrenToAdd.push(child);
  }

  attachChildLast(child) {
    this._childrenToAddLast.push(child);
  }

  addChildren() {
    this._childrenToAdd.forEach(child => this.addChild(child));
    this._childrenToAddLast.forEach(child => this.addChild(child));
  }

  addChild(child) {
    if (child instanceof Window_Base) {
      this.addWindows(child);
    } else {
      this._scene.addChild(child);
    }
  }

  addWindows(windows) {
    if (Array.isArray(windows) === false) windows = [windows];
    windows.forEach(window => this.addWindow(window));
  }

  addWindow(window) {
    this._scene.addWindow(window);
  }
}