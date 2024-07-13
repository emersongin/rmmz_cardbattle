class Step {
  _scene;
  _actionsQueue = [];
  _wait = 0;

  constructor(scene, finish) {
    if ((scene instanceof Scene_Message) === false) {
      throw new Error('Scene must be an instance of Scene_Message');
    }
    this._scene = scene;
    this._finish = finish;
  }

  update() {
    if (this._wait > 0) return this._wait--;
    if (this.hasActions() && this.isAvailable()) this.executeAction();
  }

  hasActions() {
    return this._actionsQueue.length > 0;
  }

  isAvailable() {
    return this.isBusy() === false;
  }

  isBusy() {
    const children = [];
    return this._wait > 0 || children.some(obj => (obj.isBusy ? obj.isBusy() : false)) || this.someChildrenIsBusy();
  }

  someChildrenIsBusy() {
    if (!this._scene.children || this._scene.children.length === 0) return false;
    return this._scene.children.some(sprite => {
      return (sprite instanceof CardsetSprite) && (sprite.hasCommands() || sprite.isBusy());
    });
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
    const actions = ArrayHelper.toArray(action);
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
    actions = ArrayHelper.toArray(actions);
    actions = actions.map((fn, ...params) => {
      if (Array.isArray(fn)) return this.createAction(fn[0], ...fn.slice(1));
      return this.createAction(fn)
    });
    this._actionsQueue.push(actions);
  }

  addWait(seconds = 0.6) {
    this.addAction(this.commandWait, seconds);
  }

  commandWait(seconds) {
    this._wait = seconds * GameConst.FPS;
  }

  addChild(child) {
    this.addAction(this.commandAddChild, child);
  }

  commandAddChild(child) {
    if (child instanceof Window_Base) {
      this._scene.addWindow(child);
    } else {
      this._scene.addChild(child);
    }
  }

  removeChildren(children) {
    children.forEach(child => this.removeChild(child));
  }

  removeChild(child) {
    this.addAction(this.commandRemoveChild, child);
  }

  commandRemoveChild(child) {
    if (child instanceof Window_Base) {
      this._scene.addWindow(child);
    } else {
      this._scene.removeChild(child);
    }
  }

  getPhase() {
    return this._scene.getPhase();
  }
}