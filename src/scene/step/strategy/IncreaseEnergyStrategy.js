class IncreaseEnergyStrategy {
  _scene = null;
  _player = null;
  
  constructor(scene, player) {
    this._scene = scene;
    this._player = player;
  }

  update() {
    console.log('IncreaseEnergyStrategy#update');
  }
}