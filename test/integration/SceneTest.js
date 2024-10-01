class SceneTest {
  _scene = {};
  _seconds = 1;
  _timer = 0;
  _testDescription = 'You must undertake the test(s)!';
  _assertTitle = '';
  _assertValue = undefined;
  _assertsToTest = [];
  _assertsResults = [];
  _results = [];
  _childrenToAdd = [];
  _toWatched = [];
  _watched = [];
  _errors = [];
  _handler = false;
  _pressToAsserts = false;
  _isFinish = false;
  _functionsMocked = [];

  constructor(scene) {
    this._scene = scene;
  }

  create() {
    // Override this method in the child class
  }

  start() {
    // Override this method in the child class
  }

  update() {
    // Override this method in the child class
  }

  restore() {
    const fns = this._functionsMocked;
    for (const fn of fns) {
      fn.obj[fn.fnName] = fn.originalFn;
    }
  }

  mockFunction(obj, fnName, fn, includeOriginal = false, ...params) {
    const originalFn = obj[fnName].bind(obj);
    obj[fnName] = () => {
      if (includeOriginal) originalFn(...params);
      return fn()
    };
    this._functionsMocked.push({ obj, fnName, originalFn });
  }

  spyFunction(obj, fnName, fn, ...params) {
    const includeOriginal = true;
    this.mockFunction(obj, fnName, fn, includeOriginal, ...params);
  }

  run() {
    return new Promise(async res => {
      if (this._errors.length) {
        this._scene._nextTest = null;
        this._scene._phase = null;
        this.asserts();
        await this.processAsserts();
        return res(this.finishResult());
      }
      this.startTest();
      res(await this.finish());
    });
  }

  startTest() {
    this._timer = (GameConst.FPS * this._seconds);
    this.start();
    this.addChildren();
  }

  addChildren() {
    this._childrenToAdd.forEach(child => this.addChild(child));
  }

  finish() {
    return new Promise(async res => {
      const intervalId = setInterval(() => {
        if (this._isFinish) {
          res(this.finishResult());
          clearInterval(intervalId);
        }
      }, 1);
    });
  }

  finishResult() {
    const testName = this.constructor.name;
    let passed = false;
    let assertsResult = [{ 
      passed: false,
      assertsName: 'No assertion was made!',
      asserts: []
    }];
    if (this.hasResults()) {
      passed = this._results.every(result => result.passed);
      assertsResult = this._results;
    }
    return { 
      testName, 
      passed, 
      assertsResult 
    };
  }

  hasResults() {
    return this._results.length > 0;
  }

  updateTest() {
    this.copyWatched();
    if (this._timer) return this._timer--;
    if (this._pressToAsserts && !Input.isTriggered('ok')) return false;
    if (this._handler) return false;
    if (!this._isFinish) {
      this.asserts();
      this.processAsserts();
      this._isFinish = true;
    }
  }

  copyWatched() {
    const watched = this._toWatched.map(w => ObjectHelper.copyObject(w));
    this._watched.push(watched);
  }

  async processAsserts() {
    return new Promise(async res => {
      await this.clear();
      for (const assert of this._assertsToTest) {
        const { type } = assert;
        if (type === 'assert') {
          this.processAssertsToBe(assert);
        }
        if (type === 'assertWas') {
          this.processAssertsWas(assert);
        }
        if (type === 'throwError') {
          this.processThrowError(assert);
        }
      }
      if (this.hasAsserts()) {
        this._results.push({
          passed: this._assertsResults.every(assert => assert.passed),
          assertsName: this._testDescription,
          asserts: this._assertsResults
        });
      }
      res(true);
    });
  }

  hasAsserts() {
    return this._assertsResults.length > 0;
  }

  clear() {
    return new Promise(async resolve => {
      await this.clearChildren();
      await this.clearWindows();
      resolve(true);
    });
  }

  clearChildren() {
    return new Promise(resolve => {
      const children = this._scene.children;
      while (children.length > 1) {
        children.forEach(async child => {
          if (child === this._scene._windowLayer) return false;
          child.destroy();
          await this._scene.removeChild(child);
        });
      }
      resolve(true);
    });
  }

  clearWindows() {
    return new Promise(resolve => {
      const windowChildren = this._scene._windowLayer.children;
      while (windowChildren.length) {
        windowChildren.forEach(async window => {
          window.destroy();
          await this._scene._windowLayer.removeChild(window);
        });
      }
      resolve(true);
    });
  }

  processAssertsToBe(assert) {
    const { type, title, value, toBe } = assert;
    const test = value === toBe;
    const assertResult = this.resultTest(test, toBe, value, title);
    this._assertsResults.push(assertResult);
  }

  resultTest(test, valueExpected, valueReceived, title) {
    if (test === false) {
      return this.testFailed(valueExpected, valueReceived, title);
    }
    const testSuccess = {
      passed: true,
      title,
      message: 'Test passed!'
    };
    return testSuccess;
  }

  testFailed(valueExpected, valueReceived, title) {
    return {
      passed: false,
      title,
      message: `Expected: ${valueExpected} Received: ${valueReceived}`
    };
  }

  processAssertsWas(assert) {
    const { type, title, fnOrValue, reference, params } = assert;
    const indexOfWatched = this.indexOfWatched(reference);
    const watched = this._watched.map((wat, index) => wat[indexOfWatched || 0]);
    const result = watched.some((watching, index) => {
      const obj = this._toWatched[indexOfWatched || 0];
      return this.assertWatched(obj, watching, fnOrValue, params);
    });
    const toBe = true;
    const test = result === toBe;
    const assertResult = this.resultTest(test, toBe, result, title);
    this._assertsResults.push(assertResult);
  }

  indexOfWatched(reference) {
    let index = this._toWatched.indexOf(reference) || 0;
    return index < 0 ? 0 : index;
  }

  assertWatched(reference, watching, fnOrValue, params) {
    if (!watching) return false;
    if (this.isFunction(fnOrValue)) {
      const fnName = fnOrValue.name;
      watching = ObjectHelper.mergeObjects(reference, watching);
      return watching[fnName](...params) === true;
    }
    return watching[fnOrValue] === true;
  }

  processThrowError(assert) {
    const { title, value, toBe } = assert;
    const test = this._errors.some(e => e.message === value.message && e.name === value.name);
    const assertResult = this.resultTest(test, toBe, value, title);
    this._assertsResults.push(assertResult);
  }

  isFunction(fnOrValue) {
    return typeof fnOrValue === 'function';
  }

  describe(description = 'You must undertake the test(s)!') {
    this._testDescription = description;
  }

  expect(title, value) {
    if (!title || value === undefined) {
      throw new Error('The expect method must have a title and a value!');
    }
    this._assertTitle = title;
    this._assertValue = value;
    return this;
  }

  toBe(valueToBe, title = this._assertTitle, valueToCompare = this._assertValue) {
    if (valueToBe === undefined) {
      throw new Error('The toBe method must have a value to compare!');
    }
    this._assertsToTest.push({
      type: 'assert',
      title: title || '',
      value: valueToCompare,
      toBe: valueToBe
    });
  }

  expectTrue(title, value) {
    if (!title || value === undefined) {
      throw new Error('The expectTrue method must have a title and a value!');
    }
    this._assertTitle = title;
    this._assertValue = value;
    const toBe = true;
    this.toBe(toBe, title, value);
  }

  expectWasTrue(title, fnOrValue, reference = null, ...params) {
    if (!title || !fnOrValue) {
      throw new Error('The expectWasTrue method must have a title and a function or value!');
    }
    this._assertsToTest.push({
      type: 'assertWas',
      title,
      fnOrValue,
      reference,
      params
    });
  }

  addWatched(watched) {
    this._toWatched.push(watched);
    this.attachChild(watched);
  }

  addAssistedHidden(watched) {
    this._toWatched.push(watched);
  }

  attachChild(child) {
    this._childrenToAdd.push(child);
  }

  addChild(child) {
    if (child instanceof Window_Base) {
      this.addWindow(child);
    } else {
      this._scene.addChild(child);
    }
  }

  addWindow(window) {
    this._scene._windowLayer.addChild(window);
  }

  pressToAsserts() {
    this._pressToAsserts = true;
  }

  getHandler() {
    return this.createHandler();
  }

  createHandler() {
    this._handler = true;
    this._seconds = 0;
    return () => this._handler = false;
  }

  addError(error) {
    this._errors.push(error);
  }

  expectToThrow(title, error) {
    this._assertsToTest.push({
      type: 'throwError',
      title,
      value: error,
      toBe: true
    });
  }

  setStep(step) {
    this._scene.setStep(step);
  }

  isStep(step) {
    return this._scene.isStep(step);
  }
}