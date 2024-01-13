class ActionSprite extends Sprite {
  initialize() { 
    super.initialize();
    this._actions = [];
  }

  addAction(fn, ...params) {
    const action = { 
      execute: () => fn.call(this, ...params) 
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
}