class OpenAndCloseTextWindowTest extends SceneTest {
  textWindow;

  create() {
    const centerXPosition = (Graphics.boxWidth / 2 - 100 / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - 100 / 2);
    this.textWindow = TextWindow.create(centerXPosition, centerYPosition, 100, 100);
    this.scene.addWindow(this.textWindow);
  }

  start() {
    return new Promise(resolve => {
      this.textWindow.open();
      setTimeout(() => {
        this.textWindow.close();
        setTimeout(() => {
          resolve(true);
        }, 1000);
      }, 1000);
    });
  }
}