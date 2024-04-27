class SceneTest {
  scene;

  constructor(scene) {
    this.scene = scene;
  }

  create() {
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

  clearScene() {
    return new Promise(resolve => {
      if (!this.scene) return;
      const children = this.scene.children;
      while (children.length > 1) {
        children.forEach(async child => {
          if (child === this.scene._windowLayer) return;
          await this.scene.removeChild(child);
        });
      }
      const windowChildren = this.scene._windowLayer.children;
      while (windowChildren.length) {
        windowChildren.forEach(async child => {
          await this.scene._windowLayer.removeChild(child);
        });
      }
      resolve(true);
    });
  }

  generateCards(amount = 1) {
    const cards = [];
    for (let i = 0; i < amount; i++) {
      cards.push(this.generateCard());
    }
    return cards;
  }

  generateCard() {
    return {
      type: Math.floor(Math.random() * 3) + 1,
      color: Math.floor(Math.random() * 6) + 1,
      figureName: 'default',
      attack: Math.floor(Math.random() * 99) + 1,
      health: Math.floor(Math.random() * 99) + 1
    };
  }

  timertoTrue(milliseconds, callback) {
    if (callback) callback();
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true)
      }, milliseconds)
    });
  }
}