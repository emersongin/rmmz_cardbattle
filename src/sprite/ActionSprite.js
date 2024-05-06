class ActionSprite extends Sprite {
  initialize() { 
    super.initialize();
    this._duration = 0.3;
    this._status = null;
    this._actions = [];
    this._delayActions = [];
    this._positiveIntensityEffect = false;
    this._intensityEffect = 255;
    this._opacityEffect = 255;
  }

  removeStatus() {
    this._status = null;
  }

  changeStatus(status, ...params) {
    this._status = new status(this, ...params);
  }

  show() {
    this.addAction(this.commandShow);
  }

  commandShow() {
    this.visible = true;
    return true;
  }

  hide() {
    this.addAction(this.commandHide);
  }

  commandHide() {
    this.visible = false;
    return true;
  }

  addAction(fn, ...params) {
    const action = this.createAction({ fn, delay: 0 }, ...params);
    this.addActions(action);
  }

  createAction(props, ...params) {
    const { fn, delay } = props;
    const action = { 
      fn: fn.name || 'anonymous',
      delay: delay || 0,
      execute: () => fn.call(this, ...params)
    };
    return action;
  }

  addActions(actions) {
    actions = this.toArray(actions);
    this._actions.push(actions);
  }

  addDelayAction(fn, delay, ...params) {
    const action = this.createAction({ fn, delay }, ...params);
    this.addActions(action);
  }

  toArray(items = []) {
    return (Array.isArray(items) === false) ? [items] : items;
  }

  update() {
    super.update();
    if (this.hasActions() && this.isAvailable()) this.executeAction();
    if (this.isVisible()) {
      this.updateStatus();
      this.updateDelayActions();
      this.updateChildrenEffect();
    }
  }

  hasActions() {
    return this._actions.length > 0;
  }

  isAvailable() {
    return !this.isBusy();
  }

  isBusy() {
    return this.getStatus() !== null || this.someDelayAction();
  }

  someDelayAction() {
    return this._delayActions.some(action => action.delay > 0);
  }

  getStatus() {
    return this._status;
  }

  executeAction() {
    const actions = this._actions[0];
    if (actions.length > 0) {
      for (const action of actions) {
        if (action.delay > 0) {
          this._delayActions.push(action);
          continue;
        }
        const executed = action.execute();
        if (executed) {
          this._actions.shift();
          continue;
        }
        break;
      }
    }
  }

  isVisible() {
    return this.visible;
  }

  isHidden() {
    return !this.isVisible();
  }

  updateStatus() {
    if (this._status && this._status.updateStatus) this._status.updateStatus();
  }

  updateDelayActions() {
    if (this.hasDelayActions()) {
      const action = this._delayActions[0];
      action.delay -= 1;
      if (action.delay <= 0) {
        action.execute();
        this._delayActions.shift();
      }
    }
  }

  hasDelayActions() {
    return this._delayActions.length > 0;
  }

  updateChildrenEffect() {
    this.updateIntensityEffect();
    this.updateOpacityEffect();
  }

  updateIntensityEffect() {
    if (this._intensityEffect <= 255 && !this._positiveIntensityEffect) {
      this._intensityEffect += 6;
      if (this._intensityEffect >= 255) {
        this._positiveIntensityEffect = true;
      }
    }
    if (this._intensityEffect >= 100 && this._positiveIntensityEffect) {
      this._intensityEffect -= 6;
      if (this._intensityEffect <= 100) {
        this._positiveIntensityEffect = false;
      }
    }
  }

  updateOpacityEffect() {
    this._opacityEffect -= 32;
    if (this._opacityEffect <= 0) {
      this._opacityEffect = 255;
    }
  }

  // interface cardset

  hasChildren() {
    return this.numberOfChildren() > 0;
  }

  numberOfChildren() {
    return this.children.length;
  }

  indexOfSprite(sprite) {
    for (let i = 0; i < this.numberOfChildren(); i++) {
      if (ObjectHelper.compareObjects(this.children[i], sprite)) {
        return i;
      }
    }
    return -1;
  }

  clear() {
    while (this.numberOfChildren()) {
      this.children.forEach(async child => {
        await this.removeChild(child);
      });
    }
  }
}