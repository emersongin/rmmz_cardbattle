class PowerfieldStep extends Step {
  start(manager) {
    const phase = this.getPhase();

  }
  
  update(manager) {
    if (this.isBusy() || this.hasActions()) return false;
  }

  finish(phase) {
    if (typeof this._finish === 'function') return this._finish();
    switch (phase) {
      case null:
        break;
      default:
        break;
    }
  }

  isBusy() {
    const children = [
    ];
    return super.isBusy() || children.some(obj => (obj.isBusy ? obj.isBusy() : false));
  }
}