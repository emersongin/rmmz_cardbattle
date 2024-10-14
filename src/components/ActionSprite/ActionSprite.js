// include ./SpriteMovementState.js

class ActionSprite extends Sprite {
  initialize(x = 0, y = 0) { 
    super.initialize();
    this._actionQueue = new ActionQueue(this);
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

  getPosition() {
    return { x: this.x, y: this.y };
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

  addAction(fn, ...params) {
    this._actionQueue.addAction(fn, ...params);
  }

  addTriggerAction(fn, trigger, ...params) {
    this._actionQueue.addTriggerAction(fn, trigger, ...params);
  }

  addActions(actions) {
    this._actionQueue.pushActions(actions);
  }

  addDelayedActions(fn, delay, itemSet, triggerActions) {
    return this._actionQueue.addDelayedActions(fn, delay, itemSet, triggerActions);
  }

  addWait(seconds = 0.6) {
    this.addAction(this.commandWait, seconds);
  }

  commandWait(seconds) {
    this._wait = seconds * GameConst.FPS;
  }

  show() {
    this.addAction(this.commandShow);
  }

  commandShow() {
    this.visible = true;
  }

  hide() {
    this.addAction(this.commandHide);
  }

  commandHide() {
    this.visible = false;
  }

  alignAboveOf(obj) {
    const { y } = obj;
    const receptorX = undefined;
    const receptorY = ScreenHelper.getPositionAboveOf(y, this.height);
    this.addAction(this.commandAlign, receptorX, receptorY);
  }

  alignBelowOf(obj) {
    const { y, height } = obj;
    const receptorX = undefined;
    const receptorY = ScreenHelper.getPositionBelowOf(y, height);
    this.addAction(this.commandAlign, receptorX, receptorY);
  }

  commandAlign(x = this.x, y = this.y) {
    this.x = x;
    this.y = y;
  }

  update() {
    super.update();
    if (this._wait > 0) return this._wait--;
    if (this.hasActions() && this.isAvailable()) this.executeAction();
    if (this.isVisible()) {
      this.updateStatus();
      this.updateDelayCommands();
      this.updateEffects();
    }
  }

  hasActions() {
    return this._actionQueue.hasActions();
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
    return this._actionQueue.someDelayedAction();
  }

  executeAction() {
    this._actionQueue.executeAction();
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
    this._actionQueue.updateDelayedActions();
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
    this.addAction(this.commandAlign, x, y);
  }
}