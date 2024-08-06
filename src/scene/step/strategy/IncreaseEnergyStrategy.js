class IncreaseEnergyStrategy {
  _step = null;
  _player = null;
  
  constructor(step, player) {
    this._step = step;
    this._player = player;
  }

  start() {

  }

  update() {
    this._step.setActivation({ player: this._player });
    this._step.endStrategy();
  }
}