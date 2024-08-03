class IncreaseEnergyStrategy {
  _step = null;
  _player = null;
  
  constructor(step, player) {
    this._step = step;
    this._player = player;
  }

  start() {
    this._step.setActivation({ player: this._player });
    this._step.endStrategy();
  }

  update() {
    // console.log('IncreaseEnergyStrategy#update');
  }
}