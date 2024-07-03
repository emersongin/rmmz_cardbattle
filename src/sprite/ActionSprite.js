class ActionSprite extends Sprite {
  initialize(x = 0, y = 0) { 
    super.initialize();
    this._commandQueue = [];
    this._delayCommandQueue = [];
    this._wait = 0;
    this._status = null;
    this._effects = {
      opacity: 255,
      intensity: {
        value: 255,
        positive: false
      },
    };
    this.setPosition(x, y);
  }

  setPosition(xPosition = this.x, yPosition = this.y) {
    this.x = xPosition;
    this.y = yPosition;
  }

  changeStatus(status, ...params) {
    this._status = new status(this, ...params);
  }

  removeStatus() {
    this._status = null;
  }

  addCommand(fn, ...params) {
    const command = this.createCommand({ fn, delay: 0, trigger: null }, ...params);
    this.addCommands(command);
  }

  addCommandTrigger(fn, trigger, ...params) {
    const command = this.createCommand({ fn, delay: 0, trigger }, ...params);
    this.addCommands(command);
  }

  createDelayCommand(fn, delay, ...params) {
    const command = this.createCommand({ fn, delay, trigger: null }, ...params);
    return command;
  }

  createCommand(props, ...params) {
    const { fn, delay, trigger } = props;
    const command = { 
      fn: fn.name || 'anonymous',
      delay: delay || 0,
      execute: () => {
        const result = fn.call(this, ...params);
        if (typeof trigger === 'function') trigger();
        return typeof result === 'boolean' ? result : true;
      }
    };
    return command;
  }

  addCommands(commands) {
    commands = this.toArray(commands);
    this._commandQueue.push(commands);
  }

  toArray(items = []) {
    return (Array.isArray(items) === false) ? [items] : items;
  }

  createDelayCommands(fn, delay, set, triggerActions) {
    const hasTriggerActions = triggerActions && triggerActions.length > 0;
    const commands = set.map((params, index) => {
      const appliedDelay = (index > 0) ? delay : 0;
      const command = this.createCommand({
        fn,
        delay: appliedDelay,
        trigger: hasTriggerActions ? triggerActions[index] : undefined,
      }, ...params);
      return command;
    });
    return commands;
  }

  addWait(seconds = 0.6) {
    this.addCommand(this.commandWait, seconds);
  }

  commandWait(seconds) {
    this._wait = seconds * GameConst.FPS;
  }

  show() {
    this.addCommand(this.commandShow);
  }

  commandShow() {
    this.visible = true;
  }

  hide() {
    this.addCommand(this.commandHide);
  }

  commandHide() {
    this.visible = false;
  }

  alignAboveOf(obj) {
    const { y } = obj;
    const receptorX = undefined;
    const receptorY = ScreenHelper.getPositionAboveOf(y, this.height);
    this.addCommand(this.commandAlign, receptorX, receptorY);
  }

  alignBelowOf(obj) {
    const { y, height } = obj;
    const receptorX = undefined;
    const receptorY = ScreenHelper.getPositionBelowOf(y, height);
    this.addCommand(this.commandAlign, receptorX, receptorY);
  }

  commandAlign(x = this.x, y = this.y) {
    this.x = x;
    this.y = y;
  }

  update() {
    super.update();
    if (this._wait > 0) return this._wait--;
    if (this.hasCommands() && this.isAvailable()) this.executeCommand();
    if (this.isVisible()) {
      this.updateStatus();
      this.updateDelayCommands();
      this.updateEffects();
    }
  }

  hasCommands() {
    return this._commandQueue.length > 0;
  }

  isAvailable() {
    return !this.isBusy();
  }

  isBusy() {
    return this._wait > 0 || this.someDelayCommand();
  }

  getStatus() {
    return this._status;
  }

  someDelayCommand() {
    if (this.hasDelayCommands()) {
      return this._delayCommandQueue.some(command => command.delay > 0);
    }
  }

  executeCommand() {
    const commands = this._commandQueue[0];
    if (commands.length > 0) {
      const completed = this.processCommands(commands);
      if (completed) {
        this._commandQueue.shift();
      }
    }
  }

  processCommands(commands) {
    let processed = false;
    for (const command of commands) {
      if (command.delay > 0) {
        this._delayCommandQueue.push(command);
        continue;
      }
      const completed = command.execute();
      if (completed) {
        processed = true;
        continue;
      }
      break;
    }
    return processed;
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

  updateDelayCommands() {
    if (this.hasDelayCommands()) {
      const command = this._delayCommandQueue[0];
      command.delay -= 1;
      if (command.delay <= 0) {
        command.execute();
        this._delayCommandQueue.shift();
      }
    }
  }

  hasDelayCommands() {
    return this._delayCommandQueue?.length > 0;
  }

  updateEffects() {
    this.updateIntensityEffect();
    this.updateOpacityEffect();
  }

  updateIntensityEffect() {
    if (this._effects.intensity.value <= 255 && !this._effects.intensity.positive) {
      this._effects.intensity.value += 6;
      if (this._effects.intensity.value >= 255) {
        this._effects.intensity.positive = true;
      }
    }
    if (this._effects.intensity.value >= 100 && this._effects.intensity.positive) {
      this._effects.intensity.value -= 6;
      if (this._effects.intensity.value <= 100) {
        this._effects.intensity.positive = false;
      }
    }
  }

  updateOpacityEffect() {
    this._effects.opacity -= 32;
    if (this._effects.opacity <= 0) {
      this._effects.opacity = 255;
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

  alignCenterMiddle() {
    const x = ScreenHelper.getCenterPosition(this.width);
    const y = ScreenHelper.getMiddlePosition(this.height);
    this.addCommand(this.commandAlign, x, y);
  }
}