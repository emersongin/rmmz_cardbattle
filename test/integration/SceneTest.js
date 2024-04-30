class SceneTest {
  scene;
  tests = [];
  nextAsserts = {};
  childrenToAdd = [];
  value = null;
  message = '';
  counter = 0;
  log = {
    info: function (...msg) {
      console.log(`%c${msg.map(t => t.toString())}`,`background: #5DADE2; color: #FFFFFF; font-size: 12px; padding: 5px;`);
    },
    success: function (...msg) {
      console.log(`%c${msg.map(t => t.toString())}`,`background: #008000; color: #FFFFFF; font-size: 12px; padding: 5px;`);
    },
    error: function (...msg) {
      console.log(`%c${msg.map(t => t.toString())}`,`background: #FF0000; color: #FFFFFF; font-size: 12px; padding: 5px;`);
    }
  };

  constructor(scene) {
    this.scene = scene;
  }

  create() {
    // Override this method in the child class
  }

  start() {
    // Override this method in the child class
  }

  async test(
    message = 'sem mensagem de teste!',
    act = () => { 
      this.log.error('Nenhuma Acts!');
    }, 
    assert = () => { 
      return this.log.error('Nenhuma Asserts!'); 
    }, 
    seconds = 1
  ) {
    return new Promise(async resolve => {
      this.tests.push({
        seconds,
        act: () => {
          act();
          return true;
        },
        assert: () => {
          this.message = message;
          assert();
          return true;
        }
      });
      const total = this.totalSeconds();
      return resolve(await this.timertoTrue((1000 * total) + 200));
    });
  }

  update() {
    if (this.counter) return this.counter--;
    if (this.hasAsserts()) return this.startAsserts();
    if (this.hasTests()) this.startTest();
  }

  hasAsserts() {
    return typeof this.nextAsserts === 'function';
  }

  hasTests() {
    return this.tests.length > 0;
  }

  startTest() {
    const fps = 60;
    const test = this.tests[0];
    const { seconds, act, assert } = test;
    if (test) {
      this.counter = (fps * seconds);
      this.appendChildren();
      const completed = act();
      if (completed) {
        this.nextAsserts = assert;
        this.tests.shift();
      }
    }
  }

  startAsserts() {
    const completed = this.nextAsserts();
    if (completed) {
      this.nextAsserts = null;
    }
  }

  assert(value) {
    this.value = value;
    return this;
  }

  toBe(value) {
    this.resultTest(this.value === value, value);
  }

  toBeInstanceof(value) {
    this.resultTest(this.value instanceof value, value);
  }

  resultTest(test, value) {
    this.log.info(this.message);
    if (test === false) {
      return this.consoleError(value, this.value);
    }
    this.log.success('Test passed!');
  }

  consoleError(valueExpected, valueReceived) {
    this.log.error('Test failed!');
    this.log.error('Expected:', valueExpected);
    this.log.error('Received:', valueReceived);
  }

  addChild(child) {
    this.childrenToAdd.push(child);
  }

  appendChildren() {
    this.childrenToAdd.forEach(child => {
      this.scene.addChild(child);
    });
    this.childrenToAdd = [];
  }

  totalSeconds() {
    return this.tests.reduce((acc, test) => acc + test.seconds, 0);
  }

  timertoTrue(milliseconds = 600, callback) {
    if (callback) callback();
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true)
      }, milliseconds)
    });
  }
}