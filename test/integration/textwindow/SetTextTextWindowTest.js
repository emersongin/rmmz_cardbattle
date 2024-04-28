class SetTextTextWindowTest extends SceneTest {
  textWindow;

  create() {
    const windowWidth = 0;
    const windowHeight = 0;
    const centerXPosition = 0;
    const centerYPosition = 0;
    this.textWindow = TextWindow.create(centerXPosition, centerYPosition, windowWidth, windowHeight);
  }

  start() {      
    return new Promise(async resolve => {
      await this.timertoTrue(600, () => {
        this.scene.addWindow(this.textWindow);
        this.textWindow.addText("Hello World Hello World Hello World Hello World");
        this.textWindow.addText("Hello World");
        this.textWindow.addText("Hello World Hello World Hello World");
        this.textWindow.renderTextEx();
        this.textWindow.setcenteredPosition();
        this.textWindow.open();
      })
      resolve(true);
    });
  }
}