class SetTextTextWindowTest extends SceneTest {
  textWindow;

  create() {
    this.textWindow = TextWindow.create(0, 0, 0, 0);
    this.textWindow.addText('Hello World');
    this.textWindow.renderText();
    this.scene.addWindow(this.textWindow);
  }

  start() {
    return new Promise(resolve => {
      this.textWindow.open();
      setTimeout(() => {
        resolve(true);
      }, 10000);
    });
  }
}