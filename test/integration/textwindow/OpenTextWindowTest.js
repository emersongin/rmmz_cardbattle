class OpenTextWindowTest extends SceneTest {
  textWindow;

  create() {
    this.textWindow = TextWindow.create(0, 0, 100, 100);
    this.scene.addWindow(this.textWindow);
  }

  setTest() {
    // this.textWindow.addText('Hello World!');
  }

  start() {
    return new Promise(async resolve => {
      console.log(this.textWindow);
      this.textWindow.open();
      resolve(true);
    });
  }
}