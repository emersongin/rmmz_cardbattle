class SceneTest {
  scene;
  name;
  subject;
  tests = [];
  asserts = [];
  results = [];
  subjects = [];
  nextAsserts = {};
  assertsName = '';
  assertTitle = '';
  assertValue = undefined;
  childrenToAdd = [];
  WindowsToAdd = [];
  counter = 0;
  pressToAssert = false;

  constructor(scene) {
    this.scene = scene;
  }

  create() {
    // Override this method in the child class
  }

  start() {
    this.copySubject();
  }

  run() {
    return new Promise(async res => {
      this.start();
      res(await this.finish());
    });
  }

  finish() {
    return new Promise(async res => {
      // const total = this.totalSeconds();
      // await this.timertoTrue((1000 * total) + 200);

      setInterval(() => {
        if (this.noHasTests() && this.noHasNextAsserts()) {
          res({
            passed: (this.results.length && this.results.every(result => result.passed)),
            testName: this.name,
            assertsResult: this.results
          });
        }
      }, 100);
    });
  }

  noHasTests() {
    return this.tests.length === 0;
  }

  noHasNextAsserts() {
    return !this.nextAsserts;
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

  // totalSeconds() {
  //   return this.tests.reduce((acc, test) => acc + test.seconds, 0);
  // }

  timertoTrue(milliseconds = 600, callback) {
    if (callback) callback();
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true)
      }, milliseconds)
    });
  }

  update() {
    this.copySubject();
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
      this.results.push({
        passed: this.asserts.every(assert => assert.passed),
        assertsName: this.assertsName,
        asserts: this.asserts
      });
      this.nextAsserts = null;
      this.asserts = [];
    }
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
      this.appendChildren();
      this.appendWindows();
      const completed = act();
      if (completed) {
        this.nextAsserts = asserts;
        this.tests.shift();
      }
    }
  }

  copySubject() {
    const subjectCopy = ObjectHelper.copyObject(this.subject);
    this.subjects.push(subjectCopy);
  }

  appendChildren() {
    this.childrenToAdd.forEach(child => {
      this.scene.addChild(child);
    });
    this.childrenToAdd = [];
  }

  appendWindows() {
    this.WindowsToAdd.forEach(window => {
      this.scene._windowLayer.addChild(window);
    });
    this.WindowsToAdd = [];
  }

  assertWasTrue(title, fnOrValue, ...params) {
    const result = this.subjects.some(subject => {
      if (typeof fnOrValue === 'function') {
        return subject[fnOrValue.name];
      }
      return subject[fnOrValue];
    });
    
    this.assert(title, result);
    return this.toBe(true);
  }

  assertTrue(title, value) {
    this.assert(title, value);
    return this.toBe(true);
  }

  assert(title, value) {
    this.assertTitle = title;
    this.assertValue = value;
    return this;
  }

  toBe(value) {
    const assertResult = this.resultTest(this.assertValue === value, value);
    this.asserts.push(assertResult);
  }

  resultTest(test, value) {
    if (test === false) {
      return this.testFailed(value, this.assertValue);
    }
    const testSuccess = {
      passed: true,
      title: this.assertTitle,
      message: 'Test passed!'
    };
    return testSuccess;
  }

  testFailed(valueExpected, valueReceived) {
    return {
      passed: false,
      title: this.assertTitle,
      message: `Expected: ${valueExpected} Received: ${valueReceived}`
    };
  }

  toBeInstanceof(value) {
    const assertResult = this.resultTest(this.assertValue instanceof value, value);
    this.asserts.push(assertResult);
  }

  addChild(child) {
    this.childrenToAdd.push(child);
  }

  addWindow(window) {
    this.WindowsToAdd.push(window);
  }

}