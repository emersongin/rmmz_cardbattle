class Test {
  setTest() {
    // Override this method in the child class
  }

  start() {
    // Override this method in the child class
  }

  assert(value) {
    this.value = value;
    return this;
  }

  toBe(value) {
    if (this.value !== value) {
      console.error('Test failed!: os valores não são iguais!');
      console.error('Expected:', value);
      console.error('Received:', this.value);
      return this;
    }
    console.info('Test passed!');
    return this;
  }

  toBeInstanceof(value) {
    if (!(this.value instanceof value)) {
      console.error('Test failed!: os valores não são instâncias!');
      console.error('Expected:', value);
      console.error('Received:', this.value);
      return this;
    }
    console.info('Test passed!');
    return this;
  }

  update(callback, fps = 60) {
    if (typeof callback !== 'function') return;
    for (let i = 0; i < fps; i++) {
      callback();
    }
  }
}