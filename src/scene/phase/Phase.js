class Phase {
  _scene;
  _actionsQueue = [];
  _step = 'START';
  _wait = 0;

  constructor(scene) {
    this._scene = scene;
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
    actions = actions.map((fn, ...params) => this.createAction(fn, ...params));
    this._actionsQueue.push(actions);
  }

  toArray(items = []) {
    return (Array.isArray(items) === false) ? [items] : items;
  }

  addWindow(window) {
    this._scene.addWindow(window);
  }

  addWindows(windows) {
    if (Array.isArray(windows) === false) windows = [windows];
    windows.forEach(window => this.addWindow(window));
  }

  addChild(child) {
    this._scene.addChild(child);
  }

  addWait(seconds = 0.6) {
    this.addAction(this.commandWait, seconds);
  }

  commandWait(seconds) {
    this._wait = seconds * GameConst.FPS;
  }

  commandChangeStep(step) {
    this._step = step;
  }

  getStep() {
    return this._step;
  }
}