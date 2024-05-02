// include ./state/WindowStoppedState.js
// include ./state/WindowUpdatedState.js

class CardBattleWindow extends Window_Base { 
  initialize(rect) {
    super.initialize(rect);
    this._iconset = "IconSet";
    this._values = {};
    this._status = {};
    this._updates = [];
    this.closed();
    this.stop();
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

  static create(x, y, width, height) {
    return new CardBattleWindow(new Rectangle(x, y, width, height));
  }

  static createWindowMiddleSize(x, y) {
    const width = Graphics.boxWidth / 2;
    const height = CardBattleWindow.minHeight();
    return CardBattleWindow.create(x, y, width, height);
  }

  static minHeight() {
    return 60;
  }

  static createWindowFullSize(x, y) {
    const width = Graphics.boxWidth;
    const height = CardBattleWindow.minHeight();
    return CardBattleWindow.create(x, y, width, height);
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

  static createValueUpdate(name, value) {
    return { name, value };
  }

  setVerticalPosition(position) {
    const paddingTop = 12;
    this.y = (60 * position) + paddingTop;
  }

  setHorizontalPosition(position) {
    this.x = (Graphics.boxWidth / 2) * position;
  }

  setCenteredPosition() {
    this.x = (Graphics.boxWidth / 2) - (this.width / 2);
    this.y = (Graphics.boxHeight / 2) - (this.height / 2);
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

  refresh() {
    this.contents.clear();
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

  getValue(name) {
    return this._values[name];
  }

  getValueAndconvertToDisplay(name) {
    const points = this.getValue(name) || 0;
    return StringHelper.convertPointsDisplay(points);
  }

  getValueAndconvertToDisplayPad(name) {
    const pad = 2;
    const points = this.getValue(name) || 0;
    return StringHelper.convertPointsDisplayPad(points, pad);
  }






  setTextColor(color) {
    this.changeTextColor(color || ColorManager.normalColor());
  }
}