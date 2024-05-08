class ActionSprite extends Sprite {
  initialize(x, y) { 
    super.initialize();
    this._actionsQueue = [];
    this._actionsQueueWithDelay = [];
    this._status = null;
    this._positiveIntensityEffect = false;
    this._intensityEffect = 255;
    this._opacityEffect = 255;
    this.startPosition(x || 0, y || 0);
  }

  startPosition(xPosition, yPosition) {
    this.x = xPosition || this.x;
    this.y = yPosition || this.y;
  }

  changeStatus(status, ...params) {
    this._status = new status(this, ...params);
  }

  removeStatus() {
    this._status = null;
  }

  addAction(fn, ...params) {
    const action = this.createAction({ fn, delay: 0 }, ...params);
    this.addActions(action);
  }

  createActionWithDelay(fn, delay, ...params) {
    const action = this.createAction({ fn, delay }, ...params);
    return action;
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
    this._actionsQueue.push(actions);
  }

  toArray(items = []) {
    return (Array.isArray(items) === false) ? [items] : items;
  }

  createActions(fn, set) {
    const actions = set.map((params, index) => {
      const appliedDelay = 0;
      const action = this.createAction({
        fn,
        delay: appliedDelay,
      }, ...params);
      return action;
    });
    return actions;
  }

  createActionsWithDelay(fn, delay, set) {
    const actions = set.map((params, index) => {
      const appliedDelay = (index > 0) ? delay : 0;
      const action = this.createAction({
        fn,
        delay: appliedDelay,
      }, ...params);
      return action;
    });
    return actions;
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

  update() {
    super.update();
    if (this.hasActions() && this.isAvailable()) this.executeAction();
    if (this.isVisible()) {
      this.updateStatus();
      this.updateDelayActions();
      this.updateEffects();
    }
  }

  hasActions() {
    return this._actionsQueue.length > 0;
  }

  isAvailable() {
    return !this.isBusy();
  }

  isBusy() {
    return this.getStatus() || this.someDelayAction();
  }

  getStatus() {
    return this._status;
  }

  someDelayAction() {
    return this._actionsQueueWithDelay.some(action => action.delay > 0);
  }

  executeAction() {
    const actions = this._actionsQueue[0];
    console.log(actions);
    if (actions.length > 0) {
      this.processActions(actions);
      this._actionsQueue.shift();
    }
  }

  processActions(actions) {
    for (const action of actions) {
      if (action.delay > 0) {
        this._actionsQueueWithDelay.push(action);
        continue;
      }
      action.execute();
    }
  }

  isVisible() {
    return this.visible;
  }

  isHidden() {
    return !this.isVisible();
  }

  updateStatus() {
    if (this._status) this._status?.updateStatus();
  }

  updateDelayActions() {
    if (this.hasDelayActions()) {
      const action = this._actionsQueueWithDelay[0];
      action.delay -= 1;
      if (action.delay <= 0) {
        action.execute();
        this._actionsQueueWithDelay.shift();
      }
    }
  }

  hasDelayActions() {
    return this._actionsQueueWithDelay.length > 0;
  }

  updateEffects() {
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