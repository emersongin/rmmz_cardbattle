class ValuesWindow extends StateWindow {
  static createValueUpdate(name, value) {
    return { name, value };
  }

  initialize(rect) {
    super.initialize(rect);
    this._values = {};
  }

  updateValues(updates, fps) {
    updates = Array.isArray(updates) ? updates : [updates];
    this.addCommand(this.commandUpdateValues, updates, fps);
  }

  commandUpdateValues(updates, fps) {
    if (!(this.isOpen() && this.isStopped())) return false;
    this.changeStatus(WindowUpdateState, updates, fps);
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

  getValues() {
    return this._values;
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