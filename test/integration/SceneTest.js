class SceneTest {
  scene = {};
  status = 'START';
  seconds = 1;
  counter = 0;
  waitHandler = false;
  testDescription = 'You must undertake the test(s)!';
  assertTitle = '';
  assertValue = undefined;
  assertsToTest = [];
  assertsResults = [];
  pressToStartAsserts = false;
  results = [];
  toWatched = [];
  watched = [];
  childrenToAdd = [];
  throwErrors = [];

  constructor(scene) {
    this.scene = scene;
  }

  create() {
    // Override this method in the child class
  }

  addThrowableError(error) {
    this.throwErrors.push(error);
  }

  expectToThrow(title, error) {
    this.assertsToTest.push({
      type: 'throwError',
      title,
      value: error,
      toBe: true
    });
  }

  update() {
    // Override this method in the child class
  }

  run() {
    return new Promise(async res => {
      if (this.throwErrors.length) {
        this.scene._nextTest = null;
        this.asserts();
        await this.processAsserts();
        return res(this.finishResult());
      }
      this.startTest();
      res(await this.finish());
    });
  }

  startTest() {
    this.counter = (GameConst.FPS * this.seconds);
    this.addChildren();
  }

  addChildren() {
    this.childrenToAdd.forEach(child => this.addChild(child));
  }

  finish() {
    return new Promise(async res => {
      const intervalId = setInterval(() => {
        if (this.status === 'FINISH') {
          res(this.finishResult());
          clearInterval(intervalId);
        }
      }, 100);
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
      passed = this.results.every(result => result.passed);
      assertsResult = this.results;
    }
    return { 
      testName, 
      passed, 
      assertsResult 
    };
  }

  hasResults() {
    return this.results.length > 0;
  }

  updateTest() {
    this.copyWatched();
    if (this.counter) return this.counter--;
    if (this.pressToStartAsserts && !Input.isTriggered('ok')) return;
    if (this.waitHandler) return;
    if (this.status === 'START') {
      this.scene._nextTest = null;
      this.asserts();
      this.processAsserts();
      this.status = 'FINISH';
    }
  }

  copyWatched() {
    const watched = this.toWatched.map(w => ObjectHelper.copyObject(w));
    this.watched.push(watched);
  }

  async processAsserts() {
    return new Promise(async res => {
      await this.clear();
      for (const assert of this.assertsToTest) {
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
        this.results.push({
          passed: this.assertsResults.every(assert => assert.passed),
          assertsName: this.testDescription,
          asserts: this.assertsResults
        });
      }
      res(true);
    });
  }

  hasAsserts() {
    return this.assertsResults.length > 0;
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
      const children = this.scene.children;
      while (children.length > 1) {
        children.forEach(async child => {
          if (child === this.scene._windowLayer) return;
          child.destroy();
          await this.scene.removeChild(child);
        });
      }
      resolve(true);
    });
  }

  clearWindows() {
    return new Promise(resolve => {
      const windowChildren = this.scene._windowLayer.children;
      while (windowChildren.length) {
        windowChildren.forEach(async window => {
          window.destroy();
          await this.scene._windowLayer.removeChild(window);
        });
      }
      resolve(true);
    });
  }

  processAssertsToBe(assert) {
    const { type, title, value, toBe } = assert;
    const test = value === toBe;
    const assertResult = this.resultTest(test, toBe, value, title);
    this.assertsResults.push(assertResult);
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
    const watched = this.watched.map((wat, index) => wat[indexOfWatched || 0]);
    const result = watched.some((watching, index) => {
      const obj = this.toWatched[indexOfWatched || 0];
      return this.assertWatched(obj, watching, fnOrValue, params);
    });
    const toBe = true;
    const test = result === toBe;
    const assertResult = this.resultTest(test, toBe, result, title);
    this.assertsResults.push(assertResult);
  }

  indexOfWatched(reference) {
    let index = this.toWatched.indexOf(reference) || 0;
    return index < 0 ? 0 : index;
  }

  assertWatched(reference, watching, fnOrValue, params) {
    if (this.isFunction(fnOrValue)) {
      const fnName = fnOrValue.name;
      watching = ObjectHelper.mergeObjects(reference, watching);
      return watching[fnName](...params) === true;
    }
    return watching[fnOrValue] === true;
  }

  processThrowError(assert) {
    const { title, value, toBe } = assert;
    const test = this.throwErrors.some(e => e.message === value.message && e.name === value.name);
    const assertResult = this.resultTest(test, toBe, value, title);
    this.assertsResults.push(assertResult);
  }

  isFunction(fnOrValue) {
    return typeof fnOrValue === 'function';
  }

  describe(description = 'You must undertake the test(s)!') {
    this.testDescription = description;
  }

  expect(title, value) {
    if (!title || value === undefined) {
      throw new Error('The expect method must have a title and a value!');
    }
    this.assertTitle = title;
    this.assertValue = value;
    return this;
  }

  toBe(valueToBe, title = this.assertTitle, valueToCompare = this.assertValue) {
    if (valueToBe === undefined) {
      throw new Error('The toBe method must have a value to compare!');
    }
    this.assertsToTest.push({
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
    this.assertTitle = title;
    this.assertValue = value;
    const toBe = true;
    this.toBe(toBe, title, value);
  }

  expectWasTrue(title, fnOrValue, reference = null, ...params) {
    if (!title || !fnOrValue) {
      throw new Error('The expectWasTrue method must have a title and a function or value!');
    }
    this.assertsToTest.push({
      type: 'assertWas',
      title,
      fnOrValue,
      reference,
      params
    });
  }

  addWatched(watched) {
    this.toWatched.push(watched);
    this.attachChild(watched);
  }

  addHiddenWatched(watched) {
    this.toWatched.push(watched);
  }

  attachChild(child) {
    this.childrenToAdd.push(child);
  }

  addChild(child) {
    if (child instanceof Window_Base) {
      this.addWindow(child);
    } else {
      this.scene.addChild(child);
    }
  }

  addWindow(window) {
    this.scene._windowLayer.addChild(window);
  }

  pressToAsserts() {
    this.pressToStartAsserts = true;
  }

  createHandler() {
    this.waitHandler = true;
    this.seconds = 0;
    return () => this.waitHandler = false;
  }
}