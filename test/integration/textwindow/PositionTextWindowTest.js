class PositionTextWindowTest extends SceneTest {
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
      this.scene.addWindow(this.textWindow);
      this.textWindow.addText("Hello World");
      this.textWindow.renderText();
      this.textWindow.open();
      const verticalPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      const start = 0;
      const middle = 1;
      const horizontalPositions = [start, middle];
      for (const position of verticalPositions) {
        await this.timertoTrue(200, () => this.textWindow.setVerticalPosition(position));
      }
      for (const position of horizontalPositions) {
        await this.timertoTrue(200, () => this.textWindow.setHorizontalPosition(position));
      }
      resolve(true);
    });
  }
}