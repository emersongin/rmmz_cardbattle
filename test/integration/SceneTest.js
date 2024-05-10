class SceneTest {
  scene;
  name;
  tests = [];
  asserts = [];
  assertsToTest = [];
  results = [];
  nextAsserts = {};
  assertsName = '';
  assertTitle = '';
  assertValue = undefined;
  counter = 0;
  pressToAssert = false;
  toWatched = [];
  watched = [];
  childrenToAdd = [];

  constructor(scene) {
    this.scene = scene;
  }

  create() {
    // Override this method in the child class
  }

  start() {
    // Override this method in the child class
  }

  run() {
    return new Promise(async res => {
      this.copyWatched();
      this.start();
      res(await this.finish());
    });
  }

  finish() {
    return new Promise(async res => {
      const intervalId = setInterval(() => {
        if (this.noHasTests() && this.noHasAsserts()) {
          res({
            passed: (this.results.length && this.results.every(result => result.passed)),
            testName: this.name,
            assertsResult: this.results
          });
          clearInterval(intervalId);
        }
      }, 100);
    });
  }

  noHasTests() {
    return this.tests.length === 0;
  }

  noHasAsserts() {
    return this.nextAsserts === null;
  }

  async test(assertsName, act, asserts, seconds = 1) {
    const msgDefault = 'Nenhum titulo para asserts definido.';
    const actDefault = () => { 
      console.error('Nenhum act de asserts definido.');
    };
    const assertsDefault = () => { 
      this.asserts.push({
        passed: false,
        message: 'Nenhuma assert definida!'
      });
    };
    this.tests.push({
      seconds,
      act: () => {
        act ? act() : actDefault();
        return true;
      },
      asserts: () => {
        this.assertsName = assertsName;
        asserts ? asserts() : assertsDefault();
        return true;
      }
    });
  }

  timertoTrue(milliseconds = 600, callback) {
    if (callback) callback();
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true)
      }, milliseconds)
    });
  }

  update() {
    this.copyWatched();
    if (this.counter) return this.counter--;
    if (this.hasAsserts()) {
      if (this.pressToAssert && !Input.isTriggered('ok')) return;
      return this.startAsserts();
    }
    if (this.hasTests()) this.startTest();
  }

  hasAsserts() {
    return typeof this.nextAsserts === 'function';
  }

  startAsserts() {
    const completed = this.nextAsserts();
    if (completed) {
      this.processAsserts();
      this.results.push({
        passed: this.asserts.every(assert => assert.passed),
        assertsName: this.assertsName,
        asserts: this.asserts
      });
      this.nextAsserts = null;
      this.asserts = [];
    }
  }

  processAsserts() {
    const assert = this.assertsToTest.filter(assert => assert.type === 'assert');
    const assertWas = this.assertsToTest.filter(assert => assert.type === 'assertWas');
    assert.forEach(({ title, value, toBe }) => {
      const assertResult = this.resultTest(value === toBe, toBe, title);
      this.asserts.push(assertResult);
    });
    assertWas.forEach(async ({ title, fnOrValue, reference, params }) => {
      const indexOfWatched = this.indexOfWatched(reference);
      const watched = this.watched.map((wat, index) => wat[indexOfWatched || 0]);
      await this.clear();
      const result = watched.some((watching, index) => {
        if (this.isFunction(fnOrValue)) {
          const fnName = fnOrValue.name;
          watching = ObjectHelper.mergeObjects(this.toWatched[indexOfWatched || 0], watching);
          return watching[fnName](...params) === true;
        }
        return watching[fnOrValue] === true;
      });
      const toBe = true;
      const assertResult = this.resultTest(result === toBe, toBe, title);
      this.asserts.push(assertResult);
    });
  }

  hasTests() {
    return this.tests.length > 0;
  }

  startTest() {
    const fps = 60;
    const test = this.tests[0];
    const { seconds, act, asserts } = test;
    if (test) {
      this.counter = (fps * seconds);
      this.childrenToAdd.forEach(child => this.addChild(child));
      const completed = act();
      if (completed) {
        this.nextAsserts = asserts;
        this.tests.shift();
      }
    }
  }

  copyWatched() {
    const watched = this.toWatched.map(w => ObjectHelper.copyObject(w));
    this.watched.push(watched);
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

  indexOfWatched(reference) {
    let index = this.toWatched.indexOf(reference) || 0;
    return index < 0 ? 0 : index;
  }

  isFunction(fnOrValue) {
    return typeof fnOrValue === 'function';
  }

  assertTrue(title, value) {
    this.assertsToTest.push({
      type: 'assert',
      title,
      value,
      toBe: true
    });
  }

  assert(title, value) {
    this.assertTitle = title;
    this.assertValue = value;
    return this;
  }

  toBe(value) {
    this.assertsToTest.push({
      type: 'assert',
      title: this.assertTitle,
      value: this.assertValue,
      toBe: value
    });
  }

  resultTest(test, value, title) {
    if (test === false) {
      return this.testFailed(value, this.assertValue, title);
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

  toBeInstanceof(value) {
    const assertResult = this.resultTest(this.assertValue instanceof value, value);
    this.asserts.push(assertResult);
  }

  addWatched(watched) {
    this.toWatched.push(watched);
    this.attachChild(watched);
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

  clear() {
    return new Promise(resolve => {
      const children = this.scene.children;
      while (children.length > 1) {
        children.forEach(async child => {
          if (child === this.scene._windowLayer) return;
          child.destroy();
          await this.scene.removeChild(child);
        });
      }
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
}