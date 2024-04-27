class SetTextTextWindowTest extends SceneTest {
  textWindow;

  create() {
    this.textWindow = TextWindow.create(0, 0, 0, 0);
  }

  start() {
    return new Promise(resolve => {
      this.scene.addWindow(this.textWindow);
      this.textWindow.addText('Hello World');
      this.textWindow.renderText();
      this.textWindow.open();
      setTimeout(() => {
        resolve(true);
      }, 10000);
    });
  }
}