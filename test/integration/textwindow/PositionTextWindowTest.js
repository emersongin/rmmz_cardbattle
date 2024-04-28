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
      const maxTop = 0;
      const top = 1;
      const middleTop = 3;
      const middle = 4;
      const middleBottom = 5;
      const bottom = 8;
      const maxBottom = 9;
      const verticalPositions = [maxTop, top, 2, middleTop, middle, middleBottom, 6, 7, bottom, maxBottom];
      const start = 0;
      const end = 1;
      const horizontalPositions = [start, end];
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