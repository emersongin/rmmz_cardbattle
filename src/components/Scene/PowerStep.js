class PowerStep extends Step {
  constructor(scene, phase) {
    const phasesEnabled = [GameConst.LOAD_PHASE];
    if (!phasesEnabled.some(p => p === phase)) {
      throw new Error('Invalid phase for DisplayStep.');
    }
    super(scene, phase);
  }

  start(manager) {
    const phase = this.getPhase();

  }
  
  update(manager) {
    if (this.isBusy() || this.hasActions()) return false;
  }

  commandFinish(phase) {
    switch (phase) {
      case null:
        break;
      default:
        break;
    }
    this.end();
  }

  isBusy() {
    const children = [
    ];
    return super.isBusy() || children.some(obj => (obj?.isBusy ? obj.isBusy() : false));
  }
}