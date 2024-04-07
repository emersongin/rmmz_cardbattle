class ActionSprite extends Sprite {
  initialize() { 
    super.initialize();
    this._duration = 0.3;
    this._actions = [];
  }

  addAction(fn, ...params) {
    const action = { 
      execute: () => fn.call(this, ...params),
      fn: fn.name,
    };
    this._actions.push(action);
  }

  executeAction() {
    const action = this._actions.shift();
    if (action) action.execute();
  }

  hasActions() {
    return this._actions.length > 0;
  }

  calculateTimeInterval(origin, destiny, duration = 1) {
    const distance = Math.abs(origin - destiny);
    const time = Math.abs(duration * 60);
    return (distance / time) || 1;
  }
}