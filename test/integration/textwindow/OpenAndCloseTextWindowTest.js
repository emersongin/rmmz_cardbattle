class OpenAndCloseTextWindowTest extends SceneTest {
  textWindow;

  create() {
    const windowWidth = 100;
    const windowHeight = 100;
    const centerXPosition = ((Graphics.boxWidth / 2) - (windowWidth / 2));
    const centerYPosition = ((Graphics.boxHeight / 2) - (windowHeight / 2));
    this.textWindow = TextWindow.create(centerXPosition, centerYPosition, windowWidth, windowHeight);
  }

  start() {      
    return new Promise(async resolve => {
      await this.timertoTrue(600, () => {
        this.scene.addWindow(this.textWindow);
        this.textWindow.open();
      });
      await this.timertoTrue(600, () => {
        this.textWindow.close();
      });
      resolve(true);
    });
  }
}