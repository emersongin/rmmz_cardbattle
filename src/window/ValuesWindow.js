// include ./state/WindowStoppedState.js
// include ./state/WindowUpdatedState.js

class ValuesWindow extends Window_Base { 
  initialize(rect) {
    super.initialize(rect);
    this._iconset = "IconSet";
    this._values = {};
    this._status = {};
    this._updates = [];
    this.closed();
    this.stop();
    this.reset();
  }

  closed() {
    this._openness = 0;
  }

  stop() {
    this.changeStatus(WindowStoppedState);
  }

  changeStatus(status, ...params) {
    this._status = new status(this, ...params);
  }

  reset() {
    this.refresh();
  }

  refresh() {
    this.contents.clear();
  }

  static createValueUpdate(name, value) {
    return { name, value };
  }

  update() {
    if (this.hasUpdates() && this.isStopped()) this.executeUpdate();
    if (this.isOpen() && this.getStatus()) this._status.updateStatus();
    super.update();
  }

  hasUpdates() {
    return this._updates.length > 0;
  }

  isStopped() {
    return this.getStatus() instanceof WindowStoppedState;
  }

  getStatus() {
    return this._status;
  }

  executeUpdate() {
    const updates = this._updates;
    if (updates.length > 0) {
      const update = updates[0];
      const executed = update.execute();
      if (executed) updates.shift();
    }
  }

  drawIcon(iconIndex, x, y) {
    const bitmap = ImageManager.loadSystem(this._iconset);
    const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx = (iconIndex % 16) * pw;
    const sy = Math.floor(iconIndex / 16) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
  };

  updateValues(updates) {
    updates = Array.isArray(updates) ? updates : [updates];
    this.addUpdate(this.commandUpdateValues, updates);
  }

  addUpdate(fn, ...params) {
    const update = this.createUpdate(fn, ...params);
    this._updates.push(update);
  }

  commandUpdateValues(updates) {
    if (!(this.isOpen() && this.isStopped())) return;
    this.changeStatus(WindowUpdatedState, updates);
    return true;
  }

  createUpdate(fn, ...params) {
    const action = {
      fn: fn.name || 'anonymous',
      execute: () => fn.call(this, ...params)
    };
    return action;
  }

  isAvailable() {
    return !this.isBusy();
  }

  isBusy() {
    return this.isOpening() || this.isClosing() || this.isUpdating();
  }

  isUpdating() {
    return this.getStatus() instanceof WindowUpdatedState;
  }

  addValue(name, value) {
    if (this._values.hasOwnProperty(name)) {
      return this.setValue(name, value);
    }
    Object.defineProperty(this._values, name, {
        value: value,
        writable: true,
        enumerable: true,
        configurable: true
    });
  }

  setValue(name, value) {
    this._values[name] = value;
  }

  getValueAndConvertToDisplay(name) {
    const points = this.getValue(name) || 0;
    return StringHelper.convertPointsDisplay(points);
  }

  getValue(name) {
    return this._values[name];
  }

  getValueAndConvertToDisplayPad(name) {
    const pad = 2;
    const points = this.getValue(name) || 0;
    return StringHelper.convertPointsDisplayPad(points, pad);
  }
}