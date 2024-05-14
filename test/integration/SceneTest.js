class SceneTest {
  scene = {};
  status = 'START';
  seconds = 1;
  counter = 0;
  testDescription = '';
  assertTitle = '';
  assertValue = undefined;
  assertsToTest = [];
  assertsResults = [];
  pressToStartAsserts = false;
  results = [];
  toWatched = [];
  watched = [];
  childrenToAdd = [];

  constructor(scene) {
    this.scene = scene;
  }

  create() {
    // Override this method in the child class
  }

  run() {
    return new Promise(async res => {
      this.startTest();
      res(await this.finish());
    });
  }

  startTest() {
    const fps = 60;
    this.counter = (fps * this.seconds);
    this.addChildren();
  }

  addChildren() {
    this.childrenToAdd.forEach(child => this.addChild(child));
  }

  finish() {
    return new Promise(async res => {
      const intervalId = setInterval(() => {
        if (this.status === 'FINISH') {
          res({
            passed: (this.results.length && this.results.every(result => result.passed)),
            testName: this.constructor.name,
            assertsResult: this.results
          });
          clearInterval(intervalId);
        }
      }, 100);
    });
  }

  update() {
    this.copyWatched();
    if (this.counter) return this.counter--;
    if (this.pressToStartAsserts && !Input.isTriggered('ok')) return;
    if (this.status === 'START') {
      this.asserts();
      this.processAsserts();
      this.status = 'FINISH';
    }
  }

  copyWatched() {
    const watched = this.toWatched.map(w => ObjectHelper.copyObject(w));
    // console.log(this.subject.someSpriteIsFlashPlaying());
    // console.log(watched[0]);
    this.watched.push(watched);
  }

  async processAsserts() {
    await this.clear();
    for (const assert of this.assertsToTest) {
      const { type } = assert;
      if (type === 'assert') {
        this.processAssertsToBe(assert);
      }
      if (type === 'assertWas') {
        this.processAssertsWas(assert);
      }
    }
    this.results.push({
      passed: this.assertsResults.every(assert => assert.passed),
      assertsName: this.testDescription,
      asserts: this.assertsResults
    });
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
    const assertResult = this.resultTest(value === toBe, toBe, value, title);
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
    const assertResult = this.resultTest(result === toBe, toBe, result, title);
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

  isFunction(fnOrValue) {
    return typeof fnOrValue === 'function';
  }

  describe(description = '') {
    this.testDescription = description;
  }

  assert(title, value) {
    this.assertTitle = title;
    this.assertValue = value;
    return this;
  }

  toBe(valueToBe, title, valueToCompare) {
    this.assertsToTest.push({
      type: 'assert',
      title: title || this.assertTitle,
      value: valueToCompare || this.assertValue,
      toBe: valueToBe
    });
  }

  assertTrue(title, value) {
    const toBe = true;
    this.toBe(toBe, title, value);
  }

  assertWasTrue(title, fnOrValue, reference, ...params) {
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
}