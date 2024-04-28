class OpenAndCloseTextWindowTest extends SceneTest {
  textWindow;

  create() {
    const windowWidth = 100;
    const windowHeight = 100;
    const xPosition = 0;
    const yPosition = 0;
    this.textWindow = TextWindow.create(xPosition, yPosition, windowWidth, windowHeight);
    this.textWindow.setcenteredPosition();
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