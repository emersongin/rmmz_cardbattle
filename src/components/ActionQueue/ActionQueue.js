class ActionQueue {
  _subject = null;
  _actions = [];
  _delayedActions = [];

  constructor(subject) {
    this._subject = subject;
    this._actions = [];
    this._delayedActions = [];
  }

  hasActions() {
    return this._actions.length > 0;
  }

  addAction(fn, ...params) {
    const action = this.createAction({ fn, delay: 0, trigger: null }, ...params);
    this.pushActions(action);
  }

  addTriggerAction(fn, trigger, ...params) {
    const action = this.createAction({ fn, delay: 0, trigger }, ...params);
    this.pushActions(action);
  }

  addActions(actions) {
    actions = ArrayHelper.toArray(actions);
    actions = actions.map(fn => {
      if (Array.isArray(fn)) return this.createAction({fn: fn[0], delay: 0, trigger: null}, ...fn.slice(1));
      return this.createAction({fn});
    });
    this.pushActions(actions);
  }

  addDelayedActions(fn, delay, itemSet, triggerActions) {
    if (triggerActions && (itemSet.length !== triggerActions.length)) {
      throw new Error('Item set and trigger actions must have the same length');
    }
    const hasTriggerActions = triggerActions && triggerActions.length > 0;
    const actions = itemSet.map((params, index) => {
      const appliedDelay = (index > 0) ? delay : 0;
      const action = this.createAction({
        fn,
        delay: appliedDelay,
        trigger: hasTriggerActions ? triggerActions[index] : undefined,
      }, ...params);
      return action;
    });
    this.pushActions(actions);
  }

  createAction(props, ...params) {
    const { fn, delay, trigger } = props;
    const action = { 
      fn: fn.name || 'anonymous',
      delay: delay || 0,
      execute: () => {
        const result = fn.call(this._subject, ...params);
        if (typeof trigger === 'function') trigger();
        return typeof result === 'boolean' ? result : true;
      }
    };
    return action;
  }

  pushActions(actions) {
    actions = ArrayHelper.toArray(actions);
    this._actions.push(actions);
  }

  executeAction() {
    const actions = this._actions[0];
    if (actions.length > 0) {
      const completed = this.processActions(actions);
      if (completed) {
        this._actions.shift();
      }
    }
  }

  processActions(actions) {
    let processed = false;
    for (const action of actions) {
      if (action.delay > 0) {
        this._delayedActions.push(action);
        continue;
      }
      const completed = action.execute();
      if (completed) {
        processed = true;
        continue;
      }
      break;
    }
    return processed;
  }

  someDelayedAction() {
    if (this.hasDelayedActions()) {
      return this._delayedActions.some(action => action.delay > 0);
    }
  }

  hasDelayedActions() {
    return this._delayedActions?.length > 0;
  }

  updateDelayedActions() {
    if (this.hasDelayedActions()) {
      const action = this._delayedActions[0];
      action.delay -= 1;
      if (action.delay <= 0) {
        action.execute();
        this._delayedActions.shift();
      }
    }
  }

}