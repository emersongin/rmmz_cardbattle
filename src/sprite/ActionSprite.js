class ActionSprite extends Sprite {
  initialize(x = 0, y = 0) { 
    super.initialize();
    this._commandQueue = [];
    this._delayCommandQueue = [];
    this._wait = 0;
    this._status = null;
    this._positiveIntensityEffect = false;
    this._intensityEffect = 255;
    this._opacityEffect = 255;
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
    const pop = params.slice(-1)[0];
    let chainAction = null;
    if (pop) chainAction = pop;
    const command = this.createCommand({ fn, delay: 0, chainAction }, ...params);
    this.addCommands(command);
  }

  createDelayCommand(fn, delay, ...params) {
    const command = this.createCommand({ fn, delay }, ...params);
    return command;
  }

  createCommand(props, ...params) {
    const { fn, delay, chainAction } = props;
    const command = { 
      fn: fn.name || 'anonymous',
      delay: delay || 0,
      execute: () => {
        const result = fn.call(this, ...params);
        if (typeof chainAction === 'function') chainAction();
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

  createDelayCommands(fn, delay, set, chainActions) {
    const hasChainActions = chainActions && chainActions.length > 0;
    const commands = set.map((params, index) => {
      const appliedDelay = (index > 0) ? delay : 0;
      const command = this.createCommand({
        fn,
        delay: appliedDelay,
        chainAction: hasChainActions ? chainActions[index] : undefined,
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
    return this._delayCommandQueue.some(command => command.delay > 0);
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
    return this._delayCommandQueue.length > 0;
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

  alignCenterMiddle() {
    const x = ScreenHelper.getCenterPosition(this.width);
    const y = ScreenHelper.getMiddlePosition(this.height);
    this.addCommand(this.commandAlign, x, y);
  }
}